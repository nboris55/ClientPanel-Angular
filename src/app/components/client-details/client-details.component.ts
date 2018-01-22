import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdate: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
    if(client.blance > 0) {
      this.hasBalance = true;
    }
    this.client = client;
    
    });
  }
  updateBalance(id: string) {
    this.clientService.updateClient(this.id, this.client);
    this.flashMessagesService.show('Balance was updated!', {
      cssClass: "alert-success", timeout: 2500
    });
    this.router.navigate(['/client/'+this.id]);
  }

  onDeleteClick() {
    if (confirm("are you sure to delete?")) {
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show('Client removed', {
        cssClass: "alert-success", timeout: 2500
      });
      this.router.navigate(['/']);
    }
  }

}
