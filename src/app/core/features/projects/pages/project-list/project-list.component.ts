import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material.module';
import {
  NewProjectDialogComponent,
  NewProjectDialogResult,
  ProjectStatus,
} from '../new-project-dialog/new-project-dialog.component';

interface ProjectListItem {
  id: number;
  clientName: string;
  sellerName: string;
  businessType: string;
  estimatedAmount: number;
  status: ProjectStatus;
}

@Component({
  selector: 'app-project-list',
  imports: [MaterialModule, CurrencyPipe, TitleCasePipe],
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent {
  private readonly dialog = inject(MatDialog);

  public displayedColumnsProjectList: string[] = [
    'client',
    'seller',
    'businessType',
    'stimatedAmount',
    'status',
    'options',
  ];
  public dataSourceProjectList: ProjectListItem[] = [
    {
      id: 1,
      clientName: 'Constructora Andina SAS',
      sellerName: 'Carlos Ramírez',
      businessType: 'Venta Corporativa',
      estimatedAmount: 45000000,
      status: 'oportunidad',
    },
    {
      id: 2,
      clientName: 'Transportes del Norte',
      sellerName: 'Laura Gómez',
      businessType: 'Flota Empresarial',
      estimatedAmount: 78000000,
      status: 'cotizacion_enviada',
    },
    {
      id: 3,
      clientName: 'Comercializadora El Sol',
      sellerName: 'Miguel Torres',
      businessType: 'Venta Mayorista',
      estimatedAmount: 125000000,
      status: 'en_negociacion',
    },
    {
      id: 4,
      clientName: 'Industrias Metálicas JR',
      sellerName: 'Andrés López',
      businessType: 'Contrato Marco',
      estimatedAmount: 98000000,
      status: 'vendido',
    },
    {
      id: 5,
      clientName: 'Logística Express Bogotá',
      sellerName: 'Natalia Herrera',
      businessType: 'Renovación de Flota',
      estimatedAmount: 65000000,
      status: 'facturado',
    },
  ];

  public openNewProjectDialog(): void {
    const dialogRef = this.dialog.open(NewProjectDialogComponent, {
      width: '720px',
      maxWidth: '95vw',
      autoFocus: false,
    });

    dialogRef
      .afterClosed()
      .subscribe((result: NewProjectDialogResult | undefined) => {
        if (!result) {
          return;
        }

        const newProject: ProjectListItem = {
          id: this.getNextProjectId(),
          ...result,
        };

        this.dataSourceProjectList = [
          newProject,
          ...this.dataSourceProjectList,
        ];
      });
  }

  private getNextProjectId(): number {
    if (!this.dataSourceProjectList.length) {
      return 1;
    }

    return (
      Math.max(...this.dataSourceProjectList.map((project) => project.id)) + 1
    );
  }
}
