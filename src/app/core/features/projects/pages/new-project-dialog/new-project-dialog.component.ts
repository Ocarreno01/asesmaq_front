import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/core/material.module';

export type ProjectStatus =
  | 'oportunidad'
  | 'cotizacion_enviada'
  | 'en_negociacion'
  | 'vendido'
  | 'facturado';

export interface NewProjectDialogResult {
  clientName: string;
  sellerName: string;
  businessType: string;
  estimatedAmount: number;
  status: ProjectStatus;
}

@Component({
  selector: 'app-new-project-dialog',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './new-project-dialog.component.html',
})
export class NewProjectDialogComponent {
  public readonly statusOptions: { value: ProjectStatus; label: string }[] = [
    { value: 'oportunidad', label: 'Oportunidad' },
    { value: 'cotizacion_enviada', label: 'Cotización enviada' },
    { value: 'en_negociacion', label: 'En negociación' },
    { value: 'vendido', label: 'Vendido' },
    { value: 'facturado', label: 'Facturado' },
  ];

  public readonly newProjectForm = new FormGroup({
    clientName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    sellerName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    businessType: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    estimatedAmount: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1)],
    }),
    status: new FormControl<ProjectStatus>('oportunidad', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    private readonly dialogRef: MatDialogRef<
      NewProjectDialogComponent,
      NewProjectDialogResult
    >,
  ) {}

  get f() {
    return this.newProjectForm.controls;
  }

  public close(): void {
    this.dialogRef.close();
  }

  public createProject(): void {
    if (this.newProjectForm.invalid) {
      this.newProjectForm.markAllAsTouched();
      return;
    }

    const value = this.newProjectForm.getRawValue();

    if (value.estimatedAmount === null) {
      return;
    }

    this.dialogRef.close({
      clientName: value.clientName,
      sellerName: value.sellerName,
      businessType: value.businessType,
      estimatedAmount: value.estimatedAmount,
      status: value.status,
    });
  }
}
