import {Component, EventEmitter, Input, Output, OnInit} from "@angular/core";
import {Feed} from "../../../../model/feed/feed.model";
import {Step} from "../../../../model/feed/feed-step.model";
import {FormGroup} from "@angular/forms";
import {DefineFeedService} from "../../services/define-feed.service";
import {FormsModule} from '@angular/forms'
import {AbstractFeedStepComponent} from "../AbstractFeedStepComponent";
import {StateRegistry, StateService} from "@uirouter/angular";
import {FeedSideNavService} from "../../shared/feed-side-nav.service";

@Component({
    selector: "define-feed-step-card",
    styleUrls: ["js/feed-mgr/feeds/define-feed-ng2/steps/define-feed-step-card/define-feed-step-card.component.css"],
    templateUrl: "js/feed-mgr/feeds/define-feed-ng2/steps/define-feed-step-card/define-feed-step-card.component.html"
})
export class DefineFeedStepCardComponent implements OnInit {

    @Input()
    public feed: Feed;

    @Input()
    public step : Step;

    @Input()
    public displayToolbar?:boolean = true;

    @Input()
    public displayEditActions?:boolean = true;

    @Input()
    public singleCardView:boolean;

    public disabledDependsUponStep:Step = null;


    @Input()
    public mode ?:string;

    @Output()
    saved:EventEmitter<any> = new EventEmitter<any>();

    @Output()
    cancelEdit:EventEmitter<any> = new EventEmitter<any>();

    constructor(private defineFeedService:DefineFeedService, private feedSideNavService:FeedSideNavService) {

    }

    ngOnInit() {
        if(this.mode == undefined){
            this.mode = 'normal'
        }
        this.disabledDependsUponStep = this.step.findFirstIncompleteDependentStep();
    }

    onSave(){
        this.step.dirty=false;
        this.saved.emit();
    }

    onCancel(){
        this.cancelEdit.emit();
    }

    onEdit(){
        this.feed.readonly = false;
        this.defineFeedService.markFeedAsEditable();

    }

    goToDependsUponStep(){
        if(this.disabledDependsUponStep != null){
            this.feedSideNavService.gotoStep(this.disabledDependsUponStep,this.feed.id)
        }
    }


}