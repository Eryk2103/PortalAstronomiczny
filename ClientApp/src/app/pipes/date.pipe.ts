import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'timePast'})
export class TimePastPipe implements PipeTransform {
    transform(date: Date): string {
        var dateToUtc = new Date(date.toString());
        var d = new Date();
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var nd = new Date(utc + (3600000*2));
        var secDiff = ((nd.getTime()-dateToUtc.getTime())/1000);
        if(secDiff < 0){
            return "1 s ago";
        }
        else if(secDiff < 60){
            return Math.floor(secDiff).toString()+" s ago";
        }
        else if(secDiff >= 60 && secDiff <3600){
            return Math.floor(secDiff/60).toString()+" min ago";
        }
        else if( Math.floor(secDiff/3600) == 1){
            return "1 hour ago";
        }
        else if(Math.floor(secDiff/3600) > 1 && Math.floor(secDiff/3600) <24){
            return Math.floor(secDiff/3600).toString()+" hours ago";
        }
        else if( Math.floor(secDiff/86400) == 1){
            return "1 day ago";
        }
        else if(Math.floor(secDiff/86400) > 1 && Math.floor(secDiff/86400) <365){
            return Math.floor(secDiff/86400).toString()+" days ago";
        }
        else if( Math.floor(secDiff/31556926) == 1){
            return "1 year ago";
        }
        else if( Math.floor(secDiff/31556926) > 1){
            return Math.floor(secDiff/31556926).toString() +" years ago";
        }
    }
}