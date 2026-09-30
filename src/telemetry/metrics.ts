export class TelemetryCollector {
  private startTime = Date.now();
  private counters: Map<string, number> = new Map();

  public count(metric: string, n = 1): void {
    const curr = this.counters.get(metric) || 0;
    this.counters.set(metric, curr + n);
  }

  public getSnapshot(): Record<string, number> {
    const res: Record<string, number> = {
      uptime_seconds: Math.floor((Date.now() - this.startTime) / 1000)
    };
    for (const [k, v] of this.counters.entries()) {
      res[k] = v;
    }
    return res;
  }
}
