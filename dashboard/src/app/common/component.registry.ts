import { DashboardLandingComponent } from "../dashboard-landing/dashboard-landing.component";
import { IndicatorsComponent } from "../indicators/indicators.component";
import { PerformanceComponent } from "../performance/performance.component";

export const componentsRegistry = [
    {
        type: 'dashboard',
        component: DashboardLandingComponent,
    },
    {
        type: 'pi',
        component: PerformanceComponent,
    },
    {
        type: 'indicator',
        component: IndicatorsComponent,
    }
]