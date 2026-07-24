(() => {
  const file = location.pathname.split('/').pop();
  const historical = new Set([
    '01-all-touchpoints.html', '02-funded-support-plan.html', '03-baseline-coverage.html',
    '04-essential-journeys.html', '06-roadmap-windows.html', '09-leadership-readout.html', '10-field-glossary.html',
    '13-new-touchpoint-intake.html',
    '11-careers-website-record.html', '12-required-workflow-record.html', '16-service-blueprint.html'
  ]);
  const groups = [
    {
      title: 'Historical reconstruction',
      links: [
        ['01-all-touchpoints.html', 'All touchpoints'],
        ['02-funded-support-plan.html', 'Funded support plan'],
        ['03-baseline-coverage.html', 'Baseline coverage'],
        ['04-essential-journeys.html', 'Essential journeys'],
        ['06-roadmap-windows.html', 'Roadmap windows'],
        ['16-service-blueprint.html', 'Service blueprint'],
        ['09-leadership-readout.html', 'Leadership readout'],
        ['10-field-glossary.html', 'Field glossary'],
        ['11-careers-website-record.html', 'Careers web record'],
        ['12-required-workflow-record.html', 'Required workflow record'],
        ['13-new-touchpoint-intake.html', '📄 Intake']
      ]
    },
    {
      title: 'Proposed activation views',
      links: [
        ['05-emerging-priority.html', 'Emerging priority'],
        ['07-baseline-assessment-queue.html', 'Assessment queue'],
        ['08-shared-systems.html', 'Shared systems'],
        ['14-draft-touchpoint-record.html', 'Draft record'],
        ['15-safety-check-in-app-record.html', 'Safety check-in record']
      ]
    }
  ];
  const touchpointCatalog = {
    'Safety check-in app': { id: 'TP-001', risk: 'Monitor', intervention: 'None active', next: '' },
    'Mobile associate app': { id: 'TP-002', risk: 'High', intervention: 'Modernization planned', next: 'Target known critical workflow first.' },
    'TotalCare dashboard': { id: 'TP-003', risk: 'Managed', intervention: 'Dashboard enhancement', next: '' },
    'Learning management system': { id: 'TP-004', risk: 'Managed', intervention: 'None active', next: 'Keep baseline context visible; capture reusable-pattern evidence.' },
    'Core employee hub': { id: 'TP-005', risk: 'Critical', intervention: 'Redesign planned next FY', next: '' },
    'Workplace incident and claims': { id: 'TP-006', risk: 'High', intervention: 'New functionality', next: '' },
    'Time & attendance system': { id: 'TP-007', aliases: ['Time and attendance'], risk: 'High', intervention: 'None active', next: 'Await team updates.' },
    'Payroll portal': { id: 'TP-008', risk: 'High', intervention: 'None active', next: 'Retain risk watch and future trigger.' },
    'AX Component Library': { id: 'TP-009', risk: 'High', intervention: 'Foundation stabilization and direction setting', next: 'Align priorities and ownership.' },
    'Benefits portal': { id: 'TP-010', risk: 'Managed', intervention: 'Enrollment support planning', next: 'Confirm change scope and design support.' },
    'Enterprise intranet': { id: 'TP-011', risk: 'Managed', intervention: 'Migration discovery', next: 'Plan support for navigation, content, and migration decisions.' },
    'Required workflow browser': { id: 'TP-012', risk: 'Managed', intervention: 'None active', next: 'Watch until pilot ends in FY27 Q4.' },
    'Store operations dashboard': { id: 'TP-013', risk: 'Managed', intervention: 'Monthly release', next: 'Queue lightweight flow review.' },
    'Careers website: External': { id: 'TP-014', risk: 'Critical', intervention: 'Accessibility audit / remediation in progress', next: 'Continue deep support through remediation.' },
    'Careers website: Internal': { id: 'TP-015', risk: 'Monitor', intervention: 'None active', next: 'Complete triage context.' },
    'Careers app: External': { id: 'TP-016', risk: 'Critical', intervention: 'Ownership clarification', next: '' },
    'Careers app: Internal': { id: 'TP-017', risk: 'Managed', intervention: 'None active', next: 'Capture ownership and journey context.' },
    'ServiceWow': { id: 'TP-018', risk: 'Managed', intervention: 'Vendor / VPAT review', next: 'Route vendor gap to accountable owner.' },
    'Associate scheduling kiosk': { id: 'TP-019', risk: 'Not assessed', intervention: 'None active', next: 'Complete triage context.' }
  };
  const touchpointFor = (text = '') => Object.entries(touchpointCatalog)
    .find(([name, touchpoint]) => text.includes(name) || touchpoint.aliases?.some((alias) => text.includes(alias)))?.[1];
  const touchpointIdFor = (text = '') => touchpointFor(text)?.id;
  window.touchpointCatalog = touchpointCatalog;

  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add(historical.has(file) ? 'historical-view' : 'proposed-view');
    if (file === '10-field-glossary.html') document.body.classList.add('field-glossary-view');

    // Taxonomy is background data for this prototype, not a decision-facing
    // field. Keep the views focused on the touchpoint and its current context.
    document.querySelectorAll('.touchpoint-inventory tbody tr').forEach((row) => {
      const label = row.querySelector('td:nth-child(2) .subline');
      if (!label) return;
      const touchpointId = label.textContent.match(/TP-\d+/)?.[0];
      if (touchpointId) row.children[0].textContent = touchpointId;
      label.remove();
    });
    document.querySelectorAll('.subline').forEach((label) => {
      if (label.textContent.trim().startsWith('Domain:')) label.remove();
    });
    if (file === '02-funded-support-plan.html') {
      document.querySelectorAll('table tr').forEach((row) => row.children[2]?.remove());
    }
    document.querySelectorAll('table').forEach((table) => {
      let hasTouchpointIds = false;
      const headers = [...table.querySelectorAll('thead th')].map((header) => header.textContent.trim());
      const riskIndex = headers.indexOf('Risk-and-impact result');
      const interventionIndex = headers.indexOf('Active intervention');
      const nextActionIndex = headers.indexOf('Next action');
      table.querySelectorAll('tbody tr').forEach((row) => {
        const touchpoint = touchpointFor(row.querySelector('td:nth-child(2) strong')?.textContent);
        const touchpointId = touchpoint?.id;
        const indexCell = row.querySelector(':scope > td.row-index');
        if (!touchpointId || !indexCell) return;
        indexCell.textContent = touchpointId;
        row.dataset.touchpointId = touchpointId;
        if (riskIndex >= 0) row.children[riskIndex].textContent = touchpoint.risk;
        if (interventionIndex >= 0) row.children[interventionIndex].textContent = touchpoint.intervention;
        if (nextActionIndex >= 0) row.children[nextActionIndex].textContent = touchpoint.next;
        hasTouchpointIds = true;
      });
      if (hasTouchpointIds) {
        table.classList.add('touchpoint-id-table');
        const indexHeader = table.querySelector('thead th.row-index');
        if (indexHeader) indexHeader.textContent = 'ID';
      }
    });
    document.querySelectorAll('.row-number').forEach((label) => {
      const touchpointId = touchpointIdFor(label.parentElement?.textContent);
      if (touchpointId) label.textContent = touchpointId;
      else label.remove();
    });
    if (file === '01-all-touchpoints.html') {
      const inventoryRows = [...document.querySelectorAll('.touchpoint-inventory tbody tr')];
      const riskOrder = ['Critical', 'High', 'Managed', 'Monitor', 'Not assessed'];
      const riskRank = (row) => {
        const result = row.children[5]?.textContent.trim() || '';
        return riskOrder.findIndex((label) => result.includes(label));
      };
      inventoryRows
        .sort((a, b) => {
          const riskDifference = riskRank(a) - riskRank(b);
          if (riskDifference) return riskDifference;
          const aIntervention = a.children[9]?.textContent.trim() || '';
          const bIntervention = b.children[9]?.textContent.trim() || '';
          const activityDifference = Number(aIntervention === 'None active') - Number(bIntervention === 'None active');
          if (activityDifference) return activityDifference;
          const interventionDifference = aIntervention.localeCompare(bIntervention);
          if (interventionDifference) return interventionDifference;
          return (a.children[1]?.textContent || '').localeCompare(b.children[1]?.textContent || '');
        })
        .forEach((row) => {
          row.parentElement.append(row);
        });
    }
    document.querySelectorAll('.record-section').forEach((section) => {
      if (section.querySelector(':scope > h2')?.textContent.trim() === 'Portfolio links') section.remove();
    });
    if (file !== '10-field-glossary.html') {
      const taxonomyFields = new Set(['Initiative', 'Domain', 'Workstream', 'Project']);
      document.querySelectorAll('tr').forEach((row) => {
        if (taxonomyFields.has(row.children[1]?.textContent.trim())) row.remove();
      });
    }
    if (file === '10-field-glossary.html') {
      document.querySelectorAll('tbody tr').forEach((row, index) => {
        if (row.children[0]?.classList.contains('row-index')) row.children[0].textContent = String(index + 1);
      });
    }
    document.querySelectorAll('.info').forEach((note) => {
      if (note.textContent.trim().startsWith('Portfolio taxonomy:')) note.remove();
    });
    if (file === '09-leadership-readout.html') {
      const fundedWorkHeading = [...document.querySelectorAll('h2')]
        .find((heading) => heading.textContent.trim().startsWith('Planned funded work'));
      fundedWorkHeading?.closest('.surface')?.querySelectorAll('table tr').forEach((row) => {
        row.children[2]?.remove();
      });
    }
    if (file !== '10-field-glossary.html') {
      const terminology = {
        'Scope: Associate Experience portfolio': 'Scope: touchpoint portfolio',
        'Format: narrative + project table + design gate': 'Format: narrative + work table + design gate',
        'Prioritized budgeted projects': 'Planned budgeted work',
        'Non-prioritized initiatives': 'Other planned work',
        'Project names, hours, and statuses shown here are illustrative.': 'Work names, hours, and statuses shown here are illustrative.',
        'Workstream remains an organizational taxonomy field.': '',
        'repurposing Workstream': 'repurposing another field',
        'linked project work': 'related delivery work',
        'Project': 'Planned work'
      };
      const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let textNode;
      while ((textNode = textWalker.nextNode())) {
        if (textNode.parentElement?.closest('script, style')) continue;
        for (const [from, to] of Object.entries(terminology)) {
          if (textNode.nodeValue.includes(from)) textNode.nodeValue = textNode.nodeValue.split(from).join(to);
        }
      }
    }

    const nav = document.querySelector('.sidebar nav');
    if (nav) {
      nav.replaceChildren();
      groups.forEach((group, index) => {
        const heading = document.createElement('p');
        heading.className = 'nav-title';
        heading.textContent = group.title;
        nav.append(heading);
        group.links.forEach(([href, label]) => {
          const link = document.createElement('a');
          link.className = 'nav-link';
          link.href = href;
          link.textContent = label;
          if (href === file) link.classList.add('active');
          nav.append(link);
        });
        if (index < groups.length - 1) {
          const divider = document.createElement('hr');
          divider.className = 'nav-divider';
          nav.append(divider);
        }
      });
    }

    if (!document.querySelector('.global-provenance')) {
      const banner = document.createElement('div');
      banner.className = 'global-provenance';
      banner.textContent = historical.has(file)
        ? 'Historical reconstruction · public-safe representative sample data'
        : 'Proposed operating view · public-safe representative sample data';
      document.body.prepend(banner);
    }
  });
})();
