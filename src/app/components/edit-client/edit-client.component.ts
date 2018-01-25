import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client;

  disableBalanceOnEdit: boolean = true;


  constructor(
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private settingsService: SettingsService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
    this.client = client;
    });
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (this.disableBalanceOnEdit) {
      value.balance = 0;
    }
    if(!valid) {
      this.flashMessagesService.show('Please fill in all fields', {
        cssClass: "alert-danger", timeout: 2500
      });
      this.router.navigate(['edit-client/'+ this.id]);
    } else {
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show('Changes were made', {
        cssClass: "alert-success", timeout: 2500
      });
      this.router.navigate(['/client/'+this.id]);
    }
  }


}
