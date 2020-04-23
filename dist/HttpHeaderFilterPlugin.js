import { __extends } from "tslib";
import { RemoteDependencyData } from '@microsoft/applicationinsights-common';
import { BaseTelemetryPlugin, CoreUtils, _InternalMessageId, LoggingSeverity } from "@microsoft/applicationinsights-core-js";
var HttpHeaderFilterPlugin = /** @class */ (function (_super) {
    __extends(HttpHeaderFilterPlugin, _super);
    function HttpHeaderFilterPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.priority = 200;
        return _this;
    }
    HttpHeaderFilterPlugin.prototype.initialize = function (config, core, extensions, pluginChain) {
        var _this = this;
        _super.prototype.initialize.call(this, config, core, extensions, pluginChain);
        this._extensionConfig =
            config.extensionConfig && config.extensionConfig[HttpHeaderFilterPlugin.identifier]
                ? config.extensionConfig[HttpHeaderFilterPlugin.identifier]
                : undefined;
        CoreUtils.arrForEach(extensions, function (ext) {
            var identifier = ext.identifier;
            if (identifier === 'ApplicationInsightsAnalytics') {
                _this._analyticsPlugin = ext;
            }
        });
    };
    /**
     * Filters out configured information from the telemetry event prior to sending it to Application Insights
     * @param event The event that needs to be processed
     */
    HttpHeaderFilterPlugin.prototype.processTelemetry = function (event, itemCtx) {
        var _this = this;
        var _a;
        if (this._extensionConfig !== undefined) {
            // Only process RemoteDependency (Ajax and fetch requests)
            if (event.baseType === RemoteDependencyData.dataType) {
                var headers_1 = (_a = event.baseData["properties"]) === null || _a === void 0 ? void 0 : _a.requestHeaders;
                if (headers_1 !== undefined && this._extensionConfig.filteredHeaders !== undefined) {
                    CoreUtils.arrForEach(Object.keys(this._extensionConfig.filteredHeaders), function (filteredHeader) {
                        var _a, _b;
                        // Ensure we ignore the case of the header
                        var headerProperty = _this.getPropertyCaseInsensitive(headers_1, filteredHeader);
                        // In case we found a match between configured and case insensitive property of the headers
                        if (filteredHeader !== undefined && headerProperty !== undefined) {
                            // If a replacement value is configured
                            if (((_a = _this._extensionConfig) === null || _a === void 0 ? void 0 : _a.filteredHeaders)[filteredHeader]) {
                                // Enter the replacement value
                                headers_1[headerProperty] = ((_b = _this._extensionConfig) === null || _b === void 0 ? void 0 : _b.filteredHeaders)[filteredHeader];
                            }
                            else {
                                // Otherwise, silently delete the property
                                delete headers_1[headerProperty];
                            }
                        }
                    });
                }
            }
        }
        this.processNext(event, itemCtx);
    };
    HttpHeaderFilterPlugin.prototype.getPropertyCaseInsensitive = function (object, key) {
        return Object.keys(object).filter(function (k) {
            return k.toLowerCase() === key.toLowerCase();
        })[0];
    };
    HttpHeaderFilterPlugin.prototype.trackMetric = function (metric, customProperties) {
        if (this._analyticsPlugin) {
            this._analyticsPlugin.trackMetric(metric, customProperties);
        }
        else {
            this.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TelemetryInitializerFailed, "Analytics plugin is not available, React plugin telemetry will not be sent: ");
        }
    };
    HttpHeaderFilterPlugin.prototype.trackPageView = function (pageView) {
        if (this._analyticsPlugin) {
            this._analyticsPlugin.trackPageView(pageView);
        }
        else {
            this.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TelemetryInitializerFailed, "Analytics plugin is not available, React plugin telemetry will not be sent: ");
        }
    };
    HttpHeaderFilterPlugin.identifier = "HttpHeaderFilterPlugin";
    return HttpHeaderFilterPlugin;
}(BaseTelemetryPlugin));
export default HttpHeaderFilterPlugin;
//# sourceMappingURL=HttpHeaderFilterPlugin.js.map