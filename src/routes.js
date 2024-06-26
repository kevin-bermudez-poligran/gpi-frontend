import React from 'react';
import ListadoCupones from './views/cupones/ListadoCupones';
import AgregarCupon from './views/cupones/AgregarCupon';
import { components } from 'react-select';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
// const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
// const Typography = React.lazy(() => import('./views/theme/typography/Typography'));

// // Base
// const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'));
// const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
// const Cards = React.lazy(() => import('./views/base/cards/Cards'));
// const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
// const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
// const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
// const Navs = React.lazy(() => import('./views/base/navs/Navs'));
// const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'));
// const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
// const Progress = React.lazy(() => import('./views/base/progress/Progress'));
// const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'));
// const Tables = React.lazy(() => import('./views/base/tables/Tables'));
// const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));

// // Buttons
// const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
// const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
// const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'));

// //Forms
// const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'));
// const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'));
// const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'));
// const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'));
// const Layout = React.lazy(() => import('./views/forms/layout/Layout'));
// const Range = React.lazy(() => import('./views/forms/range/Range'));
// const Select = React.lazy(() => import('./views/forms/select/Select'));
// const Validation = React.lazy(() => import('./views/forms/validation/Validation'));

// const Charts = React.lazy(() => import('./views/charts/Charts'));

// Icons
// const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
// const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
// const Brands = React.lazy(() => import('./views/icons/brands/Brands'));

// // Notifications
// const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
// const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
// const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
// const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'));

const Publicaciones = React.lazy(() => import('./views/publicidad/Publicaciones'));
const AgregarPublicidad = React.lazy(() => import('./views/publicidad/AgregarPublicidad'));
const ListadoCazatalentos = React.lazy(() => import('./views/cazatalentos/ListadoCazatalentos'));
const AgregarCazatalentos = React.lazy(() => import('./views/cazatalentos/AgregarCazatalentos'));
const ListadoCertificados = React.lazy(() => import('./views/certificados/ListadoCertificados'));
const ListadoAsociados = React.lazy(() => import('./views/asociados/ListadoAsociados'));
const AgregarAsociados = React.lazy(() => import('./views/asociados/AgregarAsociados'));
const ListadoDescuentos = React.lazy(() => import('./views/descuentos/ListadoDescuentos'));
const AgregarDescuento = React.lazy(() => import('./views/descuentos/AgregarDescuento'));
const ListadoPlanes = React.lazy(() => import('./views/planes/ListadoPlanes'));
const EditarPlan = React.lazy(() => import('./views/planes/EditarPlan'));

const ListadoSuperUsuarios = React.lazy(() => import('./views/cazatalentos/ListadoSuperUsuarios'));
const ListadoPacientes = React.lazy(() => import('./views/cazatalentos/ListadoPacientes'));
const ListadoGestores = React.lazy(() => import('./views/cazatalentos/ListadoGestores'));
const ListadoEspecialistas = React.lazy(() => import('./views/cazatalentos/ListadoEspecialistas'));

const AgregarSuperusuario = React.lazy(() => import('./views/cazatalentos/AgregarSuperusuarios'));
const AgregarPaciente = React.lazy(() => import('./views/cazatalentos/AgregarPaciente'));
const AgregarGestor = React.lazy(() => import('./views/cazatalentos/AgregarGestor'));
const AgregarEspecialist = React.lazy(() => import('./views/cazatalentos/AgregarEspecialista'));

const AgregarHorario = React.lazy(() => import('./views/publicidad/AgregarHorario'));
const ListadoHorarios = React.lazy(() => import('./views/publicidad/ListadoHorarios'));

// const Widgets = React.lazy(() => import('./views/widgets/Widgets'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  {
    path: '/publicidad',
    exact: true,
    name: 'Publicidad',
    component: Publicaciones
  },
  {
    path: '/publicidad/publicaciones',
    exact: true,
    name: 'Publicaciones de publicidad',
    component: Publicaciones
  },
  {
    path: '/publicidad/publicaciones/agregar',
    exact: true,
    name: 'Agregar publicidad',
    component: AgregarPublicidad
  },
  {
    path: '/cazatalentos',
    exact: true,
    name: 'Cazatalentos',
    component: ListadoCazatalentos
  },
  {
    path: '/cazatalentos/listado',
    exact: true,
    name: 'Cazatalentos',
    component: ListadoCazatalentos
  },
  {
    path: '/superusuarios',
    exact: true,
    name: 'Superusuarios',
    component: ListadoSuperUsuarios
  },
  {
    path: '/superusuarios/listado',
    exact: true,
    name: 'Superusuarios',
    component: ListadoSuperUsuarios
  },
  {
    path: '/superusuarios/agregar',
    exact: true,
    name: 'Agregar superusuarios',
    component: AgregarSuperusuario
  },
  {
    path: '/pacientes',
    exact: true,
    name: 'Pacientes',
    component: ListadoPacientes
  },
  {
    path: '/pacientes/listado',
    exact: true,
    name: 'Pacientes',
    component: ListadoPacientes
  },
  {
    path: '/pacientes/agregar',
    exact: true,
    name: 'Agregar paciente',
    component: AgregarPaciente
  },
  {
    path: '/gestores',
    exact: true,
    name: 'Gestores',
    component: ListadoGestores
  },
  {
    path: '/gestores/listado',
    exact: true,
    name: 'Gestores',
    component: ListadoGestores
  },
  {
    path: '/gestores/agregar',
    exact: true,
    name: 'Agregar paciente',
    component: AgregarGestor
  },
  {
    path: '/especialistas',
    exact: true,
    name: 'Especialistas',
    component: ListadoEspecialistas
  },
  {
    path: '/especialistas/listado',
    exact: true,
    name: 'Especialistas',
    component: ListadoEspecialistas
  },
  {
    path: '/especialistas/agregar',
    exact: true,
    name: 'Agregar especialista',
    component: AgregarEspecialist
  },
  {
    path: '/horarios',
    exact: true,
    name: 'Horarios',
    component: ListadoHorarios
  },
  {
    path: '/horarios/listado',
    exact: true,
    name: 'Horarios',
    component: ListadoHorarios
  },
  {
    path: '/horarios/agregar',
    exact: true,
    name: 'Agregar horario',
    component: AgregarHorario
  },
  {
    path: '/cazatalentos/listado/agregar',
    exact: true,
    name: 'Agregar Cazatalentos',
    component: AgregarCazatalentos
  },
  {
    path: '/certificados-community-futbol',
    exact: true,
    name: 'Certificados',
    component: Publicaciones
  },
  {
    path: '/certificados-community-futbol/listado',
    exact: true,
    name: 'Listado',
    component: ListadoCertificados
  },
  {
    path: '/asociados',
    exact: true,
    name: 'Asociados',
    component: ListadoAsociados
  },
  {
    path: '/asociados/listado',
    exact: true,
    name: 'Listado de Asociados',
    component: ListadoAsociados
  },
  {
    path: '/asociados/listado/agregar',
    exact: true,
    name: 'Agregar asociado',
    component: AgregarAsociados
  },
  {
    path: '/descuentos',
    exact: true,
    name: 'Descuentos',
    component: ListadoDescuentos
  },
  {
    path: '/descuentos/agregar',
    exact: true,
    name: 'Agregar descuentos',
    component: AgregarDescuento
  },
  {
    path: '/cupones',
    exact: true,
    name: 'Cupones',
    component: ListadoCupones
  },
  {
    path: '/cupones/agregar',
    exact: true,
    name: 'Agregar cupones',
    component: AgregarCupon
  },
  {
    path: '/planes',
    exact: true,
    name: 'Planes',
    component: ListadoPlanes
  },
  {
    path: '/planes/editar',
    exact: true,
    name: 'Editar plan',
    component: EditarPlan
  },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard }
  // { path: '/theme', name: 'Theme', component: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', component: Colors },
  // { path: '/theme/typography', name: 'Typography', component: Typography },
  // { path: '/base', name: 'Base', component: Cards, exact: true },
  // { path: '/base/accordion', name: 'Accordion', component: Accordion },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  // { path: '/base/cards', name: 'Cards', component: Cards },
  // { path: '/base/carousels', name: 'Carousel', component: Carousels },
  // { path: '/base/collapses', name: 'Collapse', component: Collapses },
  // { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  // { path: '/base/navs', name: 'Navs', component: Navs },
  // { path: '/base/paginations', name: 'Paginations', component: Paginations },
  // { path: '/base/popovers', name: 'Popovers', component: Popovers },
  // { path: '/base/progress', name: 'Progress', component: Progress },
  // { path: '/base/spinners', name: 'Spinners', component: Spinners },
  // { path: '/base/tables', name: 'Tables', component: Tables },
  // { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  // { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  // { path: '/buttons/dropdowns', name: 'Dropdowns', component: Dropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  // { path: '/charts', name: 'Charts', component: Charts },
  // { path: '/forms', name: 'Forms', component: FormControl, exact: true },
  // { path: '/forms/form-control', name: 'Form Control', component: FormControl },
  // { path: '/forms/select', name: 'Select', component: Select },
  // { path: '/forms/checks-radios', name: 'Checks & Radios', component: ChecksRadios },
  // { path: '/forms/range', name: 'Range', component: Range },
  // { path: '/forms/input-group', name: 'Input Group', component: InputGroup },
  // { path: '/forms/floating-labels', name: 'Floating Labels', component: FloatingLabels },
  // { path: '/forms/layout', name: 'Layout', component: Layout },
  // { path: '/forms/validation', name: 'Validation', component: Validation },
  // { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', component: Flags },
  // { path: '/icons/brands', name: 'Brands', component: Brands },
  // { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  // { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  // { path: '/notifications/badges', name: 'Badges', component: Badges },
  // { path: '/notifications/modals', name: 'Modals', component: Modals },
  // { path: '/notifications/toasts', name: 'Toasts', component: Toasts },
  // { path: '/widgets', name: 'Widgets', component: Widgets }
];

export default routes;
