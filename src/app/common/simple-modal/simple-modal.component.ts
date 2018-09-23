import {Component, Input, ViewChild, TemplateRef, Output, EventEmitter} from '@angular/core';
import {NgbModal, NgbModalRef, NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.css']
})
export class SimpleModalComponent {
  @Input() useFooter = false;
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  modalRef: NgbModalRef;
  closeResult: string;

  constructor(private modalService: NgbModal) {}

  openDialog(options = {centered: true}): NgbModalRef {
    if (!this.dialogOpen) {
      this.modalRef = this.modalService.open(this.modalContent, options);
      this.modalRef.result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.modalRef = null;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.modalRef = null;
        });
    }
    return this.modalRef;
  }

  closeDialog(result: string) {
    if (this.dialogOpen) {
      this.modalRef.close(result);
      this.modalRef = null;
    }
  }

  dismissDialog(reason: string) {
    if (this.dialogOpen) {
      this.modalRef.dismiss(reason);
      this.modalRef = null;
    }
  }

  get dialogOpen(): boolean {
    return !!this.modalRef;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
