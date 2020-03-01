import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionnaireComponent} from './patient/questionnaire/questionnaire.component';
import {PhotoProtocolComponent} from './patient/photo-protocol/photo-protocol.component';
import {PerioStateComponent} from './patient/perio-state/perio-state.component';
import {TeethFormulaComponent} from './patient/teeth-formula/teeth-formula.component';
import {XRayComponent} from './patient/x-ray/x-ray.component';
import {CarePlanComponent} from './patient/care-plan/care-plan.component';
import {DoctorsDairyComponent} from './patient/doctors-dairy/doctors-dairy.component';
import {AuthGuard} from '../guards/auth.guard';
import {PatientComponent} from './patient/patient.component';
import {PatientResolver} from '../services/patients/patient-resolver.service';
import {PatientsListComponent} from './patients-list/patients-list.component';
import {PatientsListResolver} from '../services/patients/patients-list-resolver.service';

const routes: Routes = [
  {path: 'patients', resolve: {patients: PatientsListResolver},
    component: PatientsListComponent,
    canActivate: [AuthGuard]
   // loadChildren: () => import("./patients/patients.module").then(m => m.PatientsModule)
  },
  {
    path: 'patients/:id', resolve: {patient: PatientResolver}, component: PatientComponent, canActivate: [AuthGuard], children: [
      {path: 'questionnaire', component: QuestionnaireComponent},
      {path: 'photo-protocol', component: PhotoProtocolComponent},
      {path: 'perio-state', component: PerioStateComponent},
      {path: 'teeth-formula', component: TeethFormulaComponent},
      {path: '', redirectTo: 'teeth-formula', pathMatch: 'full'},
      {path: 'x-ray', component: XRayComponent},
      {path: 'care-plan', component: CarePlanComponent},
      {path: 'doctors-dairy', component: DoctorsDairyComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule {
}
