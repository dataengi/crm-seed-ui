import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {NotificationsService} from "../../../core/notifications/notifications.service";

@Component({
  selector: 'crm-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  links: string[] = [];

  showAddLinkInput: boolean = false;
  newLink: string = '';

  @Input() currentLinks: string[];
  @Input() readonly : boolean = false;
  @Output() addedLinks: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.links.push(...this.currentLinks);
  }

  onAddNewLink() {
    if (this.isNewLink()) {
      this.links.push(this.newLink);
      this.newLink = '';
      this.addedLinks.emit(this.links);
    }
  }

  onDeleteLink(link: string) {
    this.links.splice(this.links.indexOf(link), 1);
    this.addedLinks.emit(this.links);
  }

  onCopyLink(element: Node) {
    const selection = getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    this.notificationsService.info(`${range} copied to clipboard`)
  }

  toggleShowLinks() {
    this.showAddLinkInput = !this.showAddLinkInput;
  }

  isNewLink() {
    return this.newLink && this.newLink.trim().length > 0;
  }

  haveLinks() {
    return this.links.length > 0
  }

}
