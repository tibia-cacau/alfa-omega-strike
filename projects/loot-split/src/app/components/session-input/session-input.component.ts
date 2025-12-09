import { Component, EventEmitter, Input, Output } from '@angular/core';

import { LootSplitService } from '../../services/loot-split.service';

@Component({
  selector: 'app-session-input',
  templateUrl: './session-input.component.html',
  styleUrls: ['./session-input.component.scss'],
})
export class SessionInputComponent {
  @Input() rawSession = '';
  @Input() isInvalid = false;
  @Output() sessionChange = new EventEmitter<string>();

  constructor(public lootSplitService: LootSplitService) {}

  onSessionChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.sessionChange.emit(target.value);
  }
}
