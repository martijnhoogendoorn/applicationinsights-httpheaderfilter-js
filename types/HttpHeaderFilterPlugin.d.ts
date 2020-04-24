import { IPageViewTelemetry, IMetricTelemetry, IConfig } from '@microsoft/applicationinsights-common';
import { IPlugin, IConfiguration, IAppInsightsCore, BaseTelemetryPlugin, ITelemetryItem, IProcessTelemetryContext, ITelemetryPluginChain, ICustomProperties } from "@microsoft/applicationinsights-core-js";
export default class HttpHeaderFilterPlugin extends BaseTelemetryPlugin {
    priority: number;
    identifier: string;
    private _analyticsPlugin;
    private _extensionConfig;
    initialize(config: IConfiguration & IConfig, core: IAppInsightsCore, extensions: IPlugin[], pluginChain?: ITelemetryPluginChain): void;
    /**
     * Filters out configured information from the telemetry event prior to sending it to Application Insights
     * @param event The event that needs to be processed
     */
    processTelemetry(event: ITelemetryItem, itemCtx?: IProcessTelemetryContext): void;
    private getPropertyCaseInsensitive;
    trackMetric(metric: IMetricTelemetry, customProperties: ICustomProperties): void;
    trackPageView(pageView: IPageViewTelemetry): void;
}
