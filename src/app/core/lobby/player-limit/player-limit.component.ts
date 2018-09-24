import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-player-limit',
  template: `
    <h2 mat-dialog-title>
      Too many players or Board closed
    </h2>
    <mat-dialog-content>
      Please try again
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./player-limit.component.scss']
})

export class PlayerLimitComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<PlayerLimitComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { }

  closeDialog() {
    this.dialogRef.close('Closed with button');
  }
}
