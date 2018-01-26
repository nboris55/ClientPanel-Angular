import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
 settings: Settings;

  constructor(
    public settingService: SettingsService,
    public flashMessagesService: FlashMessagesService,
    public router: Router
  ) { }

  ngOnInit() {
    this.settings = this.settingService.getSettings();
    
  }

  onSubmit() {
    this.settingService.changeSettings(this.settings);
    this.flashMessagesService.show('Settings were saved!', {
      cssClass: "alert-danger", timeout: 2500
    });
    this.router.navigate(['/']);
  }

}
