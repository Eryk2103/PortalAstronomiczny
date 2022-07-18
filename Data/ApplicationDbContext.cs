using Microsoft.EntityFrameworkCore;
using PortalAstronomiczny.Data.Models;
using Microsoft.Extensions.Options;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;

namespace PortalAstronomiczny.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<User>
    {
        
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {

        }
        public DbSet<Category> Category {get; set;}
        public DbSet<Calendar> Calendar {get; set;}
        public DbSet<Article> Articles {get; set;}
        public DbSet<ArticleComment> ArticleComments {get;set;}
        public DbSet<Equipment> Equipment {get; set;}
        public DbSet<EquipmentComment> EquipmentComments {get; set;}
        public DbSet<Messages> Messages {get; set;}
        public DbSet<Post> Posts {get; set;}
        public DbSet <PostComment> PostCommments {get; set;}
        public DbSet <PostEquipment> PostEquipment {get; set;}

        public DbSet<PostLikes> PostLikes {get; set;}
         public DbSet<EquipmentLikes> EquipmentLikes {get; set;}

    }
}



