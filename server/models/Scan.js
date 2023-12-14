class Scan {
  constructor(
    scanId,
    resourceId,
    resourceType,
    highestSeverity,
    totalFindings,
    scanDateTimestamp
  ) {
    this.scanId = scanId;
    this.resourceId = resourceId;
    this.resourceType = resourceType;
    this.highestSeverity = highestSeverity;
    this.totalFindings = totalFindings;
    this.scanDateTimestamp = scanDateTimestamp;
    this.updatedDateTimestamp = null;
  }

  getOutput(exists, time) {
    return exists
      ? {
          scan_id: this.scanId,
          highest_severity: this.highestSeverity,
          total_findings: this.totalFindings,
          scan_date_timestamp: this.scanDateTimestamp
        }
      : {
          id: this.resourceId,
          scan_id: this.scanId,
          highest_severity: this.highestSeverity,
          total_findings: this.totalFindings,
          scan_date_timestamp: this.scanDateTimestamp,
          updated_date_timestamp: time
        };
  }
}

module.exports = Scan;
