export class StorageWal {
  private log: Array<{ id: string; hash: string; timestamp: string }> = [];

  public append(id: string, hash: string): void {
    this.log.push({ id, hash, timestamp: new Date().toISOString() });
  }

  public size(): number {
    return this.log.length;
  }

  public getEntries(): Array<{ id: string; hash: string; timestamp: string }> {
    return [...this.log];
  }
}
