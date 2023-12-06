import './style.css';
import pdf from 'pdfjs/';
import logo from './logo';
import OpenSans from './opensans';
import companyLogo from './Metronet_Technologies.jpeg';
// pdfjs fork test comment for repo

async function render() {
  const agreementNumber = 'MCA1165';
  const PONumber = 3079193;
  const ProjectNumber = 'SLVSIL.01535.CB';
  const ProjectName = 'Silvis, IL City Build';
  const longestString =
    ProjectName.length > ProjectNumber.length
      ? ProjectName.length
      : ProjectNumber.length;

  const ContractorName = 'TRUVISION SERVICES INC';
  const ContractorAddress = '760 Heartland Dr Unit 1';
  const CityStateZIP = 'Sugar Grove, IL 60554';
  const longestContractorString =
    ContractorName.length > ContractorAddress.length
      ? ContractorName.length
      : ContractorAddress.length;

  const LCP = 'SS006';
  const Market = 'Silvis, IL';

  const ProjectSchedule = '06/22/2023';
  const ProjectPriceValue = 123654789.3;
  const BondingRequired = false;
  const Retainage = true;
  const RetainageAmount = 10;

  const indent = 10;
  const br = 15;
  const listIndent = 25;
  const listBr = 5;

  const tableAlignment = { textAlign: 'center' };

  const defaultFont = fonts.Helvetica; //font
  const boldFont = fonts.HelveticaBold;
  //  const italicFont = fonts.HelveticaOblique;
  const boldItalicFont = fonts.HelveticaBoldOblique;

  const ProjectPrice = ProjectPriceValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
  console.log(ProjectPrice);

  // START DOC
  const doc = new pdf.Document({
    font: defaultFont,
    padding: 72,
    fontSize: 8,
  });

  // const companyLogo = new pdf.Image(companyLogo);

  const footer = doc.footer();
  const footerTable = footer.table({ widths: [194, 194, 156] }).row();
  footerTable
    .cell({ textAlign: 'left' })
    .text('Rev. 08/25/2023', { textAlign: 'left' });
  footerTable.cell();
  footerTable.cell({ textAlign: 'right' }).text('Initial ______');
  footer.pageNumber(
    function (current, total) {
      return 'Page ' + current + ' of ' + total;
    },
    { textAlign: 'center' }
  );

  doc.cell({ paddingBottom: 30 }).text('testImage');

  const headerCell = doc.cell({ paddingBottom: 0.5 * pdf.cm });
  headerCell.text('WORK ORDER', {
    fontSize: 10,
    font: boldItalicFont,
    textAlign: 'center',
  });

  // WORK ORDER DETAILS TABLE
  const workOrderTable = doc.table({
    widths: [100, 120],
    paddingBottom: 2,
    paddingLeft: 10, //TODO fix left padding for table
  });

  const agreementNumberRow = workOrderTable.row();
  agreementNumberRow.cell().text('Agreement Number: ', { font: defaultFont });
  agreementNumberRow.cell(agreementNumber.padEnd(longestString, ' '), {
    underline: true,
    font: fonts.Courier,
  });

  const PONumberRow = workOrderTable.row();
  PONumberRow.cell().text('PO/WO Number: ', { font: defaultFont });
  PONumberRow.cell().text(PONumber.toString().padEnd(longestString, ' '), {
    underline: true,
    font: fonts.Courier,
  });

  const ProjectNumberRow = workOrderTable.row();
  ProjectNumberRow.cell().text('Project Number: ', {
    font: defaultFont,
  });
  ProjectNumberRow.cell().text(ProjectNumber.padEnd(longestString, ' '), {
    underline: true,
    font: fonts.Courier,
  });

  const ProjectNameRow = workOrderTable.row();
  ProjectNameRow.cell().text('Project Name', { font: defaultFont });
  ProjectNameRow.cell().text(ProjectName, {
    underline: true,
    font: fonts.Courier,
  });

  // CONTRACTOR DETAILS TABLE
  doc
    .cell({
      paddingTop: 10,
    })
    .text('Contractor', {
      font: fonts.HelveticaBold,
      underline: true,
    });
  const ContractorTable = doc.table({
    widths: [100, 1300],
    paddingBottom: 2,
    paddingLeft: 10,
  });
  const ContractorNameRow = ContractorTable.row();
  ContractorNameRow.cell().text('Name: ', { font: defaultFont });
  ContractorNameRow.cell().text(ContractorName, { underline: true });

  const ContractorAddressRow = ContractorTable.row();
  ContractorAddressRow.cell().text('Address: ', { font: defaultFont });
  ContractorAddressRow.cell().text(ContractorAddress, { underline: true });

  const ContractorCityStateZipRow = ContractorTable.row();
  ContractorCityStateZipRow.cell().text('City, State, Zip: ');
  ContractorCityStateZipRow.cell().text(CityStateZIP, { underline: true });

  // PURCHASE ORDER PREFACE PAGE
  doc
    .cell({ paddingTop: 15 })
    .text(
      `               Pursuant to Section 1 of the Master Contractor Agreement executed by between Metronet Technologies, LLC (hereinafter “Company”) and the Contractor, set forth below in this Work Order is the Scope of Work, Project Schedule and Work Order Price:`
    )
    .br();
  doc
    .cell() //padding top 15
    .text('Scope of Work', { font: boldFont })
    .br();

  doc.cell().text('1. General Scope of Work:');

  const workScopeTable = doc.table({ widths: [listIndent, null] });
  const generalScope = workScopeTable.row();
  generalScope.cell().text('a.', { textAlign: 'right' });
  generalScope
    .cell({ paddingLeft: indent })
    .text(
      'As further detailed in the construction drawings attached hereto as Exhibit A, Contractor could construct aerial and underground construction in service area ' +
        LCP +
        ' in ' +
        Market +
        '. '
    )
    .br();

  doc.cell().text('2. General Requirements');
  const generalReqTable = doc.table({ widths: [listIndent, null] });

  // add general requirements
  function addRequirements(marker, paragraph, options) {
    let font = defaultFont;
    if (options.bolded) {
      font = boldFont;
    }
    const requirementRow = generalReqTable.row({ font: font });
    requirementRow.cell().text(marker + '.', { textAlign: 'right' });
    requirementRow
      .cell({ paddingLeft: indent, paddingBottom: listBr })
      .text(paragraph);
  }

  addRequirements(
    'a',
    'All work described herein shall be performed in strict accordance with the Contract Documents and construction drawings produced by Company as part of this Work Order, and all applicable laws, ordinances, rules and regulations. The aforementioned laws, ordinances, rules and regulations are hereby incorporated and become a part of the Contract Documents as though they were written herein.',
    { bolded: false }
  );
  addRequirements(
    'b',
    'Contractor has the responsibility to test fiber optic cable and equipment before accepting it from Company to verify the integrity and quality of the fiber and equipment. If Contractor does not notify Company in writing within five (5) days of Contractors receipt of the fiber optic cable or equipment, such fiber and equipment shall be deemed accepted by Contractor and of good integrity and quality',
    { bolded: false }
  );
  addRequirements(
    'c',
    'Materials provided by Contractor shall comply with specifications and requirements set forth in the Contract Documents.',
    { bolded: false }
  );
  addRequirements(
    'd',
    'Contractor shall keep on the Project site during the progress of the Work a competent representative, acceptable to Company, who shall be the authorized agent of the Contractor. Directions and communications to such representative from Company in connection with the Work shall be treated as directions and communications to Contractor.',
    { bolded: false }
  );
  addRequirements(
    'e',
    'Contractor shall immediately notify Company if hazardous or contaminated materials are uncovered, encountered, revealed, or introduced at the Project site. When corrective action or remediation of hazardous or contaminated material is made necessary or is caused by Contractor’s fault or negligence, Contractor shall be responsible for all costs associated with the contamination and any subsequent cleanup cost.',
    { bolded: false }
  );
  addRequirements(
    'f',
    'Company shall have access to the Contractors existing safety program. In the event of unsafe acts performed at the Project site by the Contractor, Company shall have the right to halt the Work until an investigation can be completed and if necessary corrective action taken by the Contractor',
    { bolded: false }
  );
  addRequirements(
    'g',
    'If the contractor has been issued ground protection mats, it is required they be used anytime the contractor is boring or excavating on a yard or in landscaping',
    { bolded: true }
  );
  addRequirements(
    'h',
    'IMPORTANT: METRONET WILL NOT PAY FOR ANY WORK FOR WHICH CONTRACTOR HAS NOT SUBMITTED AN INVOICE TO OSP-INVOICES@METRONETINC.COM WITHIN 45 DAYS AFTER COMPLETION OF SUCH WORK. PAYMENT OF INVOICES IS SUBJECT TO METRONET’S ACCEPTANCE OF WORK PERFORMED. EXCEPTIONS TO THESE REQUIREMENTS MAY ONLY BE MADE BY AN EXECUTIVE VICE PRESIDENT OF THE COMPANY.',
    { bolded: true }
  );

  doc
    .cell()
    .text(
      '3. Construction drawing and Route Diagram: Attached hereto as Exhibit A.'
    )
    .br();
  doc
    .cell()
    .text('4. Company Supplied Materials: Attached hereto as Exhibit E.');

  doc.cell().pageBreak();

  // SIGNATURE PAGE
  doc
    .cell()
    .text('Project Schedule:', { font: boldFont })
    .append(
      ' The project shall be completed no later than ' + ProjectSchedule + '.',
      {
        font: defaultFont,
      }
    )
    .br();
  doc
    .cell()
    .text('Work Order Price:', { font: boldFont })
    .br()
    .text(
      '               Contractor agrees to perform all work in accordance with the Contract Documents including but not limited to all the plans, drawings, specifications, documentation, attachments, and Exhibits of this Work Order for the price(s) as stated below, which includes but is not limited to cost for all supervision, labor, non-Company supplied materials, tools, equipment, transportation, insurance, bond, restoration, consumables, safety supplies, miscellaneous materials and all other costs necessary to complete the Work.',
      { font: defaultFont }
    )
    .br()
    .text(
      '               Contractor shall be compensated for Work fully performed on a unit rate, “not to exceed” basis unless a change has been approved in writing by Company’s project manager. As stipulated in Section 5 of the Agreement, Company may at any time by written order of Company’s authorized representative, without notice to Contractor’s sureties, and without nullifying this Work Order or any of the Contract Documents, make changes in, additions to and deletions from the Work to be performed under this Work Order and Contractor shall promptly proceed with the performance of the Contract Documents as so changed. The rate set forth below is bundled rate, which includes but is not limited to cost for all supervision, labor, materials, tools, equipment, transportation, insurance, consumables, safety supplies and all other costs necessary to complete the Services.'
    )
    .br()
    .text(
      '               Contractor shall be compensated for Work performed and complete at the unit rates set forth in Exhibit B attached hereto, not to exceed the sum of (U.S.)  ' +
        ProjectPrice +
        '  (the “Work Order Price”)'
    )
    .br()
    .br();

  doc
    .cell()
    .text('Bonding:', { font: boldFont })
    .append('    Performance and Payment Bond Required ( Yes or No ) ', {
      font: defaultFont,
    })
    .append('    ')
    .append(BondingRequired ? 'Yes' : 'No', { underline: true })
    .br();

  doc
    .cell()
    .text('Retainage:', { font: boldFont })
    .append(
      '    In the event retainage is not withheld from Contractors’ partial payments, Contractor agrees that no payment will be processed until the Project has been completed and other requirements stipulated in the Agreement and Contract Documents have been satisfied.',
      { font: defaultFont }
    )
    .br();
  doc
    .cell({ paddingLeft: listIndent })
    .text('Retainage Withheld on Partial Payments ( Yes or No )')
    .append('    ')
    .append(Retainage ? 'Yes' : 'No', { underline: true, font: boldFont })
    .br();
  doc
    .cell({ paddingLeft: listIndent })
    .text('Retainage Percentage:')
    .append('    ')
    .append(RetainageAmount + '%', {
      underline: true,
      font: boldFont,
    })
    .br()
    .br();
  doc
    .cell()
    .text(
      'Contractor has executed this Work Order by its duly authorized representative this ' +
        '28th day of November, 2023' // set Date
    )
    .br()
    .br();

  const signatureTable = doc.table({ widths: [30, 180, 30, 180] });
  const th = signatureTable.header({
    font: boldFont,
  });
  th.cell('Contractor', {
    textAlign: 'center',
    colspan: 2,
  });

  function addSignatures(rowDescriptor, signatureLine) {
    const tr = signatureTable.row({
      minHeight: 0,
      paddingTop: signatureLine ? 20 : 0,
    });
    if (signatureLine) {
      tr.cell(rowDescriptor, { textAlign: 'left' });
      tr.cell('________________________________________');
    }
    if (!signatureLine) {
      tr.cell(rowDescriptor, { colspan: 2, textAlign: 'center' });
    }
  }

  addSignatures('By:', true);
  addSignatures('(Signature)');
  addSignatures('Name:', true);
  addSignatures('Title:', true);
  addSignatures('Date:', true);

  doc.cell().pageBreak();

  // CONSTRUCTION DRAWING PAGE
  doc
    .cell()
    .text('Exhibit--A', { font: boldFont, textAlign: 'center' })
    .br()
    .text('Route Diagram/Construction Drawings', {
      font: boldFont,
      textAlign: 'center',
    })
    .pageBreak();

  // UNIT RATE PAGE
  doc
    .cell()
    .text('Exhibit--B', { font: boldFont, textAlign: 'center' })
    .br()
    .text('Unit Rates', { font: boldFont, textAlign: 'center' });

  const unitRateTable = doc.table({
    widths: [45, 320, 30, 45],
    borderWidth: 0.5,
  });
  const uh = unitRateTable.header({ font: boldFont });
  uh.cell('Unit Code', tableAlignment);
  uh.cell('Unit Description', tableAlignment);
  uh.cell('UOM', tableAlignment);
  uh.cell('Unit Price', tableAlignment);

  function addUnitRates(code, description, unit, price) {
    const ur = unitRateTable.row();
    ur.cell(code, tableAlignment);
    ur.cell(description, tableAlignment);
    ur.cell(unit, tableAlignment);
    ur.cell(price, tableAlignment);
  }

  addUnitRates('AE01', 'Place 6M Strand', 'LF', '$0.70');
  addUnitRates(
    'AE02',
    'Lash Cable Up to 144 Fiber on new strand',
    'LF',
    '$0.85'
  );
  doc.cell().pageBreak();

  // HOURLY RATE PAGE
  doc
    .cell()
    .text('Hourly Unit Rates', { font: boldFont, textAlign: 'center' })
    .br();

  const hourlyRateTable = doc.table({
    widths: [44, 266, 60, 40, 40], //468 --- 455
    borderWidth: 0.5,
  });
  const hh = hourlyRateTable.header({ font: boldFont });
  hh.cell('Unit Code', { ...tableAlignment, paddingTop: 5 });
  hh.cell('Unit Description', { ...tableAlignment, paddingTop: 5 });
  hh.cell('UOM', { ...tableAlignment, paddingTop: 5 });
  hh.cell('Unit Price', { ...tableAlignment, paddingTop: 5 });
  hh.cell('Premium Unit Rate²', tableAlignment);

  // subheader for combined cells into a row to denote new section
  function addHourlyRates(subheader, description, code, unit, price, premium) {
    const hr = hourlyRateTable.row();
    if (subheader) {
      hr.cell(description, { ...tableAlignment, colspan: 5, font: boldFont });
    }
    if (!subheader) {
      hr.cell(code, tableAlignment);
      hr.cell(description, { textAlign: 'justify', paddingLeft: 5 });
      hr.cell(unit, tableAlignment);
      hr.cell(price, tableAlignment);
      hr.cell(premium, tableAlignment);
    }
  }

  addHourlyRates(true, 'Personnel');
  addHourlyRates(
    false,
    'Foreman',
    'L10A',
    'Per Hr on Site',
    '$45.00',
    '$61.00'
  );
  addHourlyRates(true, 'Trucks/Trailers');

  doc.cell({ paddingTop: br }).text('Notes:', { font: boldFont }).br();
  doc
    .cell()
    .text('1', { font: boldFont })
    .append(
      '-Unless otherwise set forth in the Work Order, hourly rates will only be used for Authorized Extra Work only, and where the required activity cannot be categorized into and established Unit Rate listed above.',
      { font: defaultFont }
    );
  doc
    .cell()
    .text('2', { font: boldFont })
    .append(
      '-Premium Rate established to allow for work requiring in excess of 40/wk/individual, work on holidays, and emergency calls',
      { font: defaultFont }
    );
  doc
    .cell()
    .text('*', { font: boldFont })
    .append(
      '-Billings submitted using hourly rates must be supported by timesheets and other documentation reasonable required by Company',
      { font: defaultFont }
    );

  doc.pageBreak();

  // UNIT RATE DESC PAGE
  doc
    .cell()
    .text('Exhibit--C', { textAlign: 'center', font: boldFont })
    .br()
    .text('Unit Rate Descriptions', { textAlign: 'center', font: boldFont })
    .br()
    .br();

  function addUnitHeader({ header }) {
    doc.cell().text(header, { font: boldFont }).br().br();
  }

  function addUnitDescription({ type, description, measure, options = {} }) {
    doc.cell().text(type, { font: boldFont }).br();
    const unitDescription = doc.cell().text(description);
    if (options.isUnderlined) {
      unitDescription
        .append(' ' + options.underlinedText, { underline: true })
        .append(' ' + options.followingText);
    }
    doc
      .cell()
      .text('Unit applied per ' + measure, { font: boldFont })
      .br()
      .br();
  }

  addUnitHeader({ header: 'Aerial Units' });
  addUnitDescription({
    type: '(AE1) Place 6M Strand',
    description:
      'Unit covers all the handling associated with placing 6M aerial suspension strand including hardware for attachment of strand to pole and grounding. Metronet shall provide hardware listed in the work order.',
    measure: 'foot',
  });
  addUnitDescription({
    type: '(UG16) Directional bore 4 - 1.25 inch ID subduct',
    description:
      'Unit applies to a successful bore and pulling back tracer wire and 4 products each up to 1.25 inches in inside diameter. This includes proofing duct and associated digging, locating the ends of the pipe, coupling pipe, backfilling and compacting of bore pits leaving area level and smooth conforming to surrounding terrain, removing all excess soil and debris, and re-seeding and mulching of disturbed areas. At no time shall any excess soil or debris be placed on the lawn, sidewalk, driveway or in landscaped areas without first placing a tarp or other blanket to protect the area (export/import of excavated material is highly recommended). ',
    measure: 'foot',
    options: {
      isUnderlined: true,
      underlinedText:
        'Final restoration of all excavations shall be completed within 48 hours from initial excavation',
      followingText:
        'All machinery used in yards or on drives and sidewalks shall be matted into, and while on the site will remain on rubber mats specifically designed to prevent scarring of lawns or surfaces without exception. Also includes entrance into pedestals and hand holes and capping pipe. Footage calculated from structure to structure.',
    },
  });

  // doc
  //   .cell('test', { paddingBottom: 0.5 * pdf.cm, borderBottomWidth: 1 })
  //   .text()
  //   .add('For more information visit the')
  //   .add('Documentation', {
  //     link: 'https://github.com/rkusa/pdfjs/tree/master/docs',
  //     underline: true,
  //     color: 0x569cd6,
  //   });

  // const table = doc.table({
  //   widths: [1.5 * pdf.cm, 1.5 * pdf.cm, null, 2 * pdf.cm, 2.5 * pdf.cm],
  //   borderHorizontalWidths: function (i) {
  //     return i < 2 ? 1 : 0.1;
  //   },
  //   padding: 5,
  // });

  // const tr = table.header({
  //   font: fonts.HelveticaBold,
  //   borderBottomWidth: 1.5,
  // });
  // tr.cell('#');
  // tr.cell('Unit');
  // tr.cell('Subject');
  // tr.cell('Price', { textAlign: 'right' });
  // tr.cell('Total', { textAlign: 'right' });

  // function addRow(qty, name, desc, price) {
  //   const tr = table.row();
  //   tr.cell(qty.toString());
  //   tr.cell('pc.');

  //   const article = tr.cell().text();
  //   article
  //     .add(name, { font: fonts.HelveticaBold })
  //     .br()
  //     .add(desc, { fontSize: 11, textAlign: 'justify' });

  //   tr.cell(price.toFixed(2) + ' €', { textAlign: 'right' });
  //   tr.cell((price * qty).toFixed(2) + ' €', { textAlign: 'right' });
  // } // addrow

  // addRow(2, 'Article A', lorem, 500);
  // addRow(1, 'Article B', lorem, 250);
  // addRow(2, 'Article C', lorem, 330);
  // addRow(3, 'Article D', lorem, 1220);
  // addRow(2, 'Article E', lorem, 120);
  // addRow(5, 'Article F', lorem, 50);

  const buf = await doc.asBuffer();
  const blob = new Blob([buf], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const previewEl = document.getElementById('preview');
  previewEl.data = url;
} // render function

import CourierBold from 'pdfjs/font/Courier-Bold';
import CourierBoldOblique from 'pdfjs/font/Courier-BoldOblique';
import CourierOblique from 'pdfjs/font/Courier-Oblique';
import Courier from 'pdfjs/font/Courier';
import HelveticaBold from 'pdfjs/font/Helvetica-Bold';
import HelveticaBoldOblique from 'pdfjs/font/Helvetica-BoldOblique';
import HelveticaOblique from 'pdfjs/font/Helvetica-Oblique';
import Helvetica from 'pdfjs/font/Helvetica';
import Symbol from 'pdfjs/font/Symbol';
import TimesBold from 'pdfjs/font/Times-Bold';
import TimesBoldItalic from 'pdfjs/font/Times-BoldItalic';
import TimesItalic from 'pdfjs/font/Times-Italic';
import TimesRoman from 'pdfjs/font/Times-Roman';
import ZapfDingbats from 'pdfjs/font/ZapfDingbats';

const fonts = {
  CourierBold,
  CourierBoldOblique,
  CourierOblique,
  Courier,
  HelveticaBold,
  HelveticaBoldOblique,
  HelveticaOblique,
  Helvetica,
  Symbol,
  TimesBold,
  TimesBoldItalic,
  TimesItalic,
  TimesRoman,
  ZapfDingbats,
  OpenSans,
};

render().catch((err) => {
  throw err;
});
