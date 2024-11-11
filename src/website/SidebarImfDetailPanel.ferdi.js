import { RGBColor, RGBColorToHexString, RGBAColor, RGBAColorToHexString, ColorComponentFromFloat } from '../engine/model/color.js';
import { AddDiv, AddDomElement, ShowDomElement, SetDomElementOuterHeight } from '../engine/viewer/domutils.js';
import { AddRangeSlider, AddToggle, AddCheckbox } from '../website/utils.js';
import { CalculatePopupPositionToElementTopLeft } from './dialogs.js';
import { PopupDialog } from './dialog.js';
import { Settings } from './settings.js';
import { SidebarPanel } from './sidebarpanel.js';
import { ShadingType } from '../engine/threejs/threeutils.js';
import { ProjectionMode } from '../engine/viewer/camera.js';
import { Loc } from '../engine/core/localization.js';

import '@simonwep/pickr/dist/themes/monolith.min.css';

class ImfDetailDisplaySection {
  constructor(parentDiv) {
    this.parentDiv = parentDiv;
    this.contentDiv = AddDiv(this.parentDiv, 'ferdi_sidebar_imfdetail_section');
    AddDiv(this.contentDiv, 'ferdi_sidebar_title', Loc('IMF Detail'));
    this.parameterDiv = AddDiv(this.contentDiv, 'ferdi_sidebar_parameter', Loc('The detail of Imf will be provided soon.'));
    this.callbacks = null;
  }

  Init(callbacks) {
    this.callbacks = callbacks;

    // add imfData ident and status inside this.parameterDiv

    // add imfData content
  }

  Update() {
    // TBD
  }

  UpdateVisibility() {
    // TBD
  }

  Clear() {
    // TBD, clearing content
  }
}

export class SidebarImfDetailPanel extends SidebarPanel {
  constructor(parentDiv, imfData) {
    super(parentDiv);
    this.imfData = imfData;

    this.sectionsDiv = AddDiv(this.contentDiv, 'ferdi_sidebar_imfdetail_sections ov_thin_scrollbar');
    this.imfDetailDisplaySection = new ImfDetailDisplaySection(this.sectionsDiv);
  }

  GetName() {
    return Loc('IMF Details');
  }

  HasTitle() {
    return false;
  }

  GetIcon() {
    return 'imf-ferdi';
  }

  Clear() {
    this.imfDetailDisplaySection.Clear();
  }

  Init(callbacks) {
    super.Init(callbacks);

    this.imfDetailDisplaySection.Init({
      getImfIdentStatus: () => {
        return this.callbacks.getImfIdentStatus();
      },
      getImfContent: () => {
        return this.callbacks.getImfContent();
      },
    });
  }

  UpdateControlsStatus() {
    this.imfDetailDisplaySection.Update();
  }

  UpdateControlsVisibility() {
    this.imfDetailDisplaySection.UpdateVisibility();
    this.Resize();
  }

  Resize() {
    let height = this.parentDiv.offsetHeight;
    SetDomElementOuterHeight(this.sectionsDiv, height);
  }
}
