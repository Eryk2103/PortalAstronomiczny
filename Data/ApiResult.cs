using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Reflection;
using System.Linq.Dynamic.Core;

namespace PortalAstronomiczny.Data
{
    public class ApiResult<T>
    {
        public List<T> Data {get; private set;}
        public int PageIndex {get; private set;}
        public int PageSize {get; private set;}
        public int TotalCount {get; private set;}
        public int TotalPages {get; private set;}

        public string SortColumn {get; private set;}
        public string SortOrder {get; private set;}
        public string FilterColumn {get; private set;}
        public string FilterQuery {get; set;}
        private ApiResult(List<T> data, int count, int pageIndex, int pageSize, string sortColumn, string sortOrder, string filterColumn, string filterQuery)
        {
            Data = data;
            PageIndex = pageIndex;
            PageSize = pageSize;
            TotalCount = count;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            SortColumn = sortColumn;
            SortOrder = sortOrder;
            FilterColumn = filterColumn;
            FilterQuery = filterQuery;
            
        }
        public static async Task<ApiResult<T>> CreateAsync( IQueryable<T> source, int pageIndex, int pageSize, string sortColumn=null, string sortOrder=null, string filterColumn=null, string filterQuery=null)
        {
            if( !string.IsNullOrEmpty(filterColumn) && IsValidProperty(filterColumn) &&  !string.IsNullOrEmpty(filterQuery) )
            {
                source = source.Where(string.Format("{0}.Contains(@0)",filterColumn),filterQuery);
            }
            var count = await source.CountAsync();
            if( !string.IsNullOrEmpty(sortColumn) && IsValidProperty(sortColumn))
            {
                sortOrder = !string.IsNullOrEmpty(sortOrder) && sortOrder.ToUpper() == "ASC" ? "ASC" : "DESC";
                source = source.OrderBy(string.Format("{0} {1}",sortColumn, sortOrder));
            }
            if(pageSize>0)
            {
                source = source
                .Skip(pageIndex * pageSize)
                .Take(pageSize);
            }
            

            var data = await source.ToListAsync();

            return new ApiResult<T>(data, count, pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
        }
        
        
        public bool HasPreviousPage
        {
            get
            {
                return (PageIndex > 0);
            }
        }
        public bool HasNextPage
        {
            get
            {
                return ((PageIndex +1) < TotalPages);
            }
        }
        public static bool IsValidProperty(string propertyName, bool throwExceptionIfNotFound = true)
        {
            var prop = typeof(T).GetProperty(propertyName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);

            if(prop == null && throwExceptionIfNotFound)
                throw new NotSupportedException(string.Format("ERROR: Property '{0}' does not exist ",propertyName ));
            return prop != null;
        }

    }
}
