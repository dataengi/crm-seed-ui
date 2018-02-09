import {Component, Input, HostBinding, Output, EventEmitter, OnInit, OnChanges, SimpleChanges} from "@angular/core";

@Component({
  selector: 'crm-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnInit, OnChanges {

  @Input() placeholder: string = 'Add a tag';
  @Input() items: string[] = [];
  @Output() itemsChange = new EventEmitter<string[]>();
  @Input() delimiterCode: number = 32;
  @Input() pasteDelimiter: RegExp = null;
  @Input() addOnBlur: boolean = true;
  @Input() addOnEnter: boolean = true;
  @Input() addOnPaste: boolean = true;
  @Input() allowedTagsPattern: RegExp = /.+/;
  @Input() errorMessage = "Invalid email";
  @HostBinding('class.crm-tag-input-focus') isFocussed;
  @Input() readonly: boolean = false;

  public tagsList: string[];
  public inputValue: string = '';
  public delimiter: number;
  public selectedTag: number;

  ngOnInit() {
    this.tagsList = this.items;
    this.onChange(this.tagsList);
    this.delimiter = this.delimiterCode;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['items']) {
      this.tagsList = this.items
    }
  }

  inputChanged(event) {
    let key = event.keyCode;
    switch (key) {
      case 8: // Backspace
        this._handleBackspace();
        break;
      case 13: //Enter
        this.addOnEnter && this._addTags([this.inputValue]);
        event.preventDefault();
        break;

      case this.delimiter:
        this._addTags([this.inputValue]);
        event.preventDefault();
        break;

      default:
        this._resetSelected();
        break;
    }
  }

  inputFocused() {
    this.isFocussed = true;
  }

  inputPaste(event) {
    let clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
    let pastedString = clipboardData.getData('text/plain');
    let tags = this.splitPasteString(pastedString);
    let tagsToAdd = tags.filter((tag) => this.isValidAndNotInTagList(tag));
    let filteredTagsToAdd = this.uniqueTags(tagsToAdd);
    this._addTags(filteredTagsToAdd);
    setTimeout(() => this.inputValue = '', 50);
  }

  private splitPasteString(tagString: string) {
    tagString = tagString.trim();
    let tags = this.pasteDelimiter ? tagString.split(this.pasteDelimiter) : tagString.split(/\s\n|\n\s|\s|\n/);
    return tags.filter((tag) => !!tag.trim());
  }

  private _isTagValid(tagString: string) {
    return this.allowedTagsPattern.test(tagString);
  }

  private isValidAndNotInTagList(tagString: string) {
    return this.allowedTagsPattern.test(tagString) && !this.tagsList.find(tag => tag === tagString);
  }

  private uniqueTags(tags: string[]) {
    return tags.filter((tag, index, array) => index == array.indexOf(tag));
  }

  private _addTags(tags: string[]) {
    let validTags = tags.filter((tag) => this._isTagValid(tag));
    this.tagsList = this.tagsList.concat(validTags);
    this._resetSelected();
    this._resetInput();
    this.onChange(this.tagsList);
  }

  private _removeTag(tagIndexToRemove) {
    this.tagsList.splice(tagIndexToRemove, 1);
    this._resetSelected();
    this.onChange(this.tagsList);
  }

  private _handleBackspace() {
    if (!this.inputValue.length && this.tagsList.length) {
      if (!this.isBlank(this.selectedTag)) {
        this._removeTag(this.selectedTag);
      }
      else {
        this.selectedTag = this.tagsList.length - 1;
      }
    }
  }

  private _resetSelected() {
    this.selectedTag = null;
  }

  private _resetInput() {
    this.inputValue = '';
  }

  /** Implemented as part of ControlValueAccessor. */
  onChange: (value) => any = () => {
    this.itemsChange.emit(this.tagsList);
  };

  isValid() {
    return this.inputValue && !this._isTagValid(this.inputValue);
  }

  isBlank(obj: any): boolean {
    return obj == null;
  }

}
