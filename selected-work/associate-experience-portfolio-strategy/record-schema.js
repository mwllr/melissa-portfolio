(() => {
  const tag = (value) => `<span class="pill tag">${value}</span>`;
  const empty = (value = "Not yet captured") => `<span class="empty">${value}</span>`;
  const records = {
    "careers-external": {
      historical: true,
      title: "Careers website: External", subtitle: "TP-014 · Public candidate journey",
      tags: `${tag("Website")}${tag("Live")}<span class="pill funded">Funded</span>`,
      values: {
        type: tag("Website"), lifecycle: tag("Live"), intake: "Complete", created: "July 2026", url: "careers.example.com", owner: "Careers digital product lead", maturity: tag("Fix"),
        surfaces: "Careers app: External",
        audience: tag("Public"), reach: tag("High"), journey: "Find, evaluate, and begin applying for jobs.", required: "Yes", alternate: "No",
        signals: `${tag("Historical risk")}${tag("Delivery timing")}${tag("High reach / no alt")}`, riskResult: "<strong>Critical</strong>", rationale: "Essential public journey with no meaningful alternate path, elevated risk context, and active remediation.", override: "Not set", overrideRationale: "Not applicable", finalRisk: "<strong>Critical</strong>",
        coverage: "<span class=\"pill funded\">Funded</span>", baseline: "Minimum expectations, office hours, and an explicit escalation route.", help: "Flow-level guidance during remediation.", funding: "Essential high-risk journey with an active accessibility remediation window.", decisionOwner: "Portfolio lead", intervention: "Accessibility audit / remediation in progress", epicLabel: "Linked epic", epics: tag("ENG-129"), window: "Current remediation window", capacity: "Deep support", checkpoint: "Remediation review", followUp: "Confirm candidate-journey coverage", evidence: "Audit findings, remediation status, and candidate-flow review.",
        next: "Continue deep support through remediation and review the public candidate journey at the next checkpoint.", assessment: "No additional assessment recommended while remediation is active.", leverage: "No shared-system action identified.", timing: "Act now; active remediation is the current support window.",
        commentOwner: "Portfolio lead", commentDate: "July 2026", comment: "Accessibility audit and remediation remain active. Confirm coverage of the candidate journey at the next review."
      }
    },
    "required-workflow": {
      historical: true,
      title: "Required workflow browser", subtitle: "TP-012 · Required associate task completion",
      tags: `${tag("Platform")}${tag("Live")}<span class="pill baseline">Baseline</span>`,
      values: {
        type: tag("Platform"), lifecycle: tag("Live"), intake: "Complete", created: "July 2026", url: empty(), owner: empty(), maturity: tag("Identify"),
        surfaces: empty("None linked"),
        audience: tag("Internal"), reach: tag("High"), journey: "Complete a required associate task.", required: "Yes", alternate: "Yes; pilot-stage alternative route",
        signals: tag("Delivery timing"), riskResult: "<strong>Managed</strong>", rationale: "Required journey stays visible while the pilot’s alternative route remains available; reassess when the pilot ends.", override: "Not set", overrideRationale: "Not applicable", finalRisk: "<strong>Managed</strong>",
        coverage: "<span class=\"pill baseline\">Baseline</span>", baseline: "Minimum expectations and an explicit review route.", help: "Office-hours review when a change window or access concern surfaces.", funding: empty("No funded decision"), decisionOwner: empty(), intervention: "None active", epics: empty("None linked"), window: empty("No scheduled work"), capacity: "Baseline support", checkpoint: empty("Not scheduled"), followUp: empty(), evidence: "Capture change context, alternate-path evidence, and access concerns when they surface.",
        next: "Watch until pilot ends in FY27 Q4.", assessment: "Quick baseline audit at the pilot end, or sooner if the alternative route changes.", leverage: "Not enough dependency evidence to assess shared leverage.", timing: "Reassess at the pilot end in FY27 Q4.",
        commentOwner: "Portfolio team", commentDate: "July 2026", comment: "No comments yet. Add current review context when a change window or access concern surfaces."
      }
    },
    "safety-check-in": {
      title: "Safety check-in app", subtitle: "TP-001 · Event-driven emergency support",
      tags: `${tag("App")}${tag("Proposed")}<span class="pill baseline">Baseline</span>`,
      values: {
        type: tag("App"), lifecycle: tag("Proposed"), intake: "Complete", created: "July 2026", url: empty("Location not yet captured"), owner: "Safety / operations partner", maturity: tag("Build"),
        surfaces: empty("None linked"),
        audience: tag("Internal"), reach: "Targeted, event-driven", journey: "Confirm safety status and receive next-step guidance during an activation event.", required: "Yes", alternate: "Limited",
        signals: tag("Delivery timing"), riskResult: "<strong>Monitor</strong>", rationale: "The event-driven journey is important, but current alternate channels and activation context need confirmation before changing the support lane.", override: "Not set", overrideRationale: "Not applicable", finalRisk: "<strong>Monitor</strong>",
        coverage: "<span class=\"pill baseline\">Baseline</span>", baseline: "Visibility, standards, and a targeted guidance route.", help: "Office-hours discovery before the next activation season.", funding: empty("No funded decision"), decisionOwner: "Safety / operations partner", intervention: "None active", epics: empty("None linked"), window: "Before the next activation season", capacity: "Baseline support", checkpoint: "Pre-activation readiness review", followUp: "Confirm alternate channels and activation communication", evidence: "Alternate-path inventory, activation communication, and support triggers.",
        next: "", assessment: "Office-hours discovery", leverage: "No shared-system action identified.", timing: "Review before the next activation season.",
        commentOwner: "Safety / operations partner", commentDate: "July 2026", comment: "Confirm the alternate channels, activation communication, and support trigger before the next scheduled activation period."
      }
    }
  };

  const field = (label, value) => `<div class="field-row"><div class="field-label">${label}</div><div class="field-value">${value}</div></div>`;
  const section = (title, rows, wide = false) => `<section class="record-section${wide ? " wide" : ""}"><h2>${title}</h2>${rows.join("")}</section>`;

  const renderRecordDetails = (record) => {
    const v = record.values;
    const assessmentLabel = "Risk-and-impact result";
    const generatedTitle = "Decision follow-through";
    return `<div class="record-sections">
      ${section("Identity", [field("Touchpoint type", v.type), field("Lifecycle", v.lifecycle), field("Intake status", v.intake), field("Created", v.created), field("URL or location", v.url), field("Owner", v.owner), field("A11y maturity", v.maturity)])}
      ${section("Connected context", [field("Connected surfaces", v.surfaces)])}
      ${section("Audience and journey", [field("Audience", v.audience), field("Reach", v.reach), field("Essential journey", v.journey), field("Essential required journey", v.required), field("Alternate path available?", v.alternate)])}
      ${section("Signals and assessment", [field("Signals", v.signals), field(assessmentLabel, v.riskResult), field("Risk rationale", v.rationale), field("Risk override", v.override), field("Override rationale", v.overrideRationale), field("Final risk assessment", v.finalRisk)])}
      ${section("A11y support decision", [field("Portfolio coverage", v.coverage), field("Baseline support available", v.baseline), field("Targeted help path", v.help), field("Funding rationale", v.funding), field("Decision owner", v.decisionOwner), field("Active intervention", v.intervention), field(v.epicLabel || "Linked epics", v.epics), field("Delivery window", v.window), field("Capacity / timing", v.capacity), field("Next checkpoint", v.checkpoint), field("Owner follow-up", v.followUp), field("Evidence to collect", v.evidence)], true)}
      ${section(generatedTitle, [field("Next action", v.next), field("Assessment note", v.assessment), field("Leverage note", v.leverage), field("Timing note", v.timing)], true)}
      <section class="record-section wide"><h2>Comments</h2><article class="comment"><div class="comment-meta"><strong>${v.commentOwner}</strong><span>${v.commentDate}</span></div><p>${v.comment}</p></article></section>
    </div>`;
  };

  window.touchpointRecords = records;
  window.renderRecordDetails = renderRecordDetails;
  document.addEventListener("DOMContentLoaded", () => {
    const mount = document.querySelector("[data-record-detail]");
    const record = mount && records[mount.dataset.recordDetail];
    if (record) mount.outerHTML = renderRecordDetails(record);
  });
})();
