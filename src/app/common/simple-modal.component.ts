import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-simple-modal',
  template: `
  <div id="simple-modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{title}}</h4>
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        </div>
        <div class="modal-body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`.modal-body { height: 300px; width: 400px}
  .modal{
    font-family: 'Comfortaa', cursive;
    top: 50%;
    margin-top: -180px;
  }`]
})
export class SimpleModalComponent {
  @Input() title: string;
}
