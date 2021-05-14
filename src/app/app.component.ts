import { HttpService } from './shared/services/http.service';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import {
  ScheduleComponent, EventSettingsModel, View, TimelineMonthService,
  ResizeService, EventRenderedArgs, DragAndDropService, CellTemplateArgs, getWeekNumber, TimeScaleModel, getWeekLastDate, WeekService, WorkWeekService, MonthService, TimelineViewsService, PopupOpenEventArgs
} from '@syncfusion/ej2-angular-schedule';
import { Internationalization, extend } from '@syncfusion/ej2-base';
import { Meetings } from "./models/Meetings"
import {headerRowData} from ".././data"
@Component({
  selector: 'app-root',
  providers: [WeekService, WorkWeekService, MonthService, TimelineViewsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // specifies the template string for the Schedule component
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'calendar-schedular';
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public selectedDate: Date = new Date();
  public eventSettings: EventSettingsModel = null;// { dataSource: <Object[]>extend([], headerRowData, null, true) };
  public currentView: View = 'TimelineMonth';
  public instance: Internationalization = new Internationalization();
  public timeScale: TimeScaleModel = {
    enable: true,
    slotCount: 3
  };
  public workWeekDays: number[];
  public scheduleViews: View[] = ['Week', 'WorkWeek', 'Month', 'TimelineWeek', 'TimelineWorkWeek'];

  constructor(private http: HttpService) {

  }


  ngOnInit(): void {
    this.getWeekWorkDays();
    this.showEvents();
      // this.eventSettings = { dataSource: <Object[]>extend([], headerRowData) };


  }

  onEventRendered(args: EventRenderedArgs): void {
    if (args.data) {
      let data = args.data;
      let meetings = new Meetings();
      meetings.title = data.Subject;;
      meetings.startDate = data.StartTime;
      meetings.endDate = data.EndTime;
      meetings.id = data.Id;
      meetings.description = data.Description;
      if (data.RecurrenceRule) {
        let rules: string[] = data.RecurrenceRule.split(";");
        rules.forEach(element => {
          element.includes("FREQ") ? meetings.repeatType = element.split("=")[1] : null;
          element.includes("BYDAY") ? meetings.repeatOnDays = element.split("=")[1] : null;
          element.includes("INTERVAL") ? meetings.repeatOn = element.split("=")[1] : null;
          element.includes("UNTIL") ? meetings.repeatEndDate = new Date(element.split("=")[1]) : null;
          element.includes("COUNT") ? meetings.repereatEndInterval = parseInt(element.split("=")[1]) : null;

        });
      }



      this.saveMeeting(meetings).subscribe((res: any) => {
        if (res) {
          const categoryColor: string = args.data.CategoryColor as string;
          if (!args.element || !categoryColor) {
            return;
          }
          if (this.currentView === 'Agenda') {
            (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
          } else {
            args.element.style.backgroundColor = categoryColor;
          }
        }
      })


    }

  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type == 'Editor') {
      (<any>this.scheduleObj.eventWindow).recurrenceEditor.frequencies = ['daily', 'weekly', "monthly"];
    }
  }

  getWeekWorkDays() {
    this.http.get("/workdays/getdaynos", { data: { isWorkingDay: true } }, true).subscribe((res: any) => {

      this.workWeekDays = [...res.data]
    })
  }


  saveMeeting(obj: Meetings) {
    return this.http.post("/meetings/", { data: obj }, true);
  }

  getMeetings() {
    return this.http.get("/meetings/", { data: null }, true);
  }

  showEvents() {
    this.getMeetings().subscribe((res: any) => {
      let meetings: Meetings[] = res.data;
      let dataSource = meetings.map(item => {
        let data: any = {};
        data.Subject = item.title;
        data.StartTime = new Date(item.startDate);
        data.EndTime = new Date(item.endDate);
        data.Id = item.id;
        data.Description = item.description;
        // data.CategoryColor= "#ea7a57"
        data.RecurrenceRule ="";
        // item.repeatType ? data.RecurrenceRule+="FREQ="+item.repeatType+";":null;
        // item.repeatType ? data.RecurrenceRule+="BYDAY="+item.repeatOnDays+";":null;
        // item.repeatType ? data.RecurrenceRule+="INTERVAL="+item.repeatOn+";":null;
        // item.repeatType ? data.RecurrenceRule+="UNTIL="+item.repeatEndDate+";":null;
        // item.repeatType ? data.RecurrenceRule+="COUNT="+item.repereatEndInterval+";":null;
         if(!data.RecurrenceRule ){
            delete data.RecurrenceRule ;
         }
        return data
      });
      this.scheduleObj.eventSettings.dataSource=dataSource;

    })
  }
}
