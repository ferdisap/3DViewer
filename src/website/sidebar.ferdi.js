import { GetDomElementOuterWidth, SetDomElementOuterHeight, SetDomElementOuterWidth } from '../engine/viewer/domutils.js';
import { PanelSet } from './panelset.js';
import { SidebarDetailsPanel } from './sidebardetailspanel.js';
import { SidebarSettingsPanel } from './sidebarsettingspanel.js';
import { SidebarImfDetailPanel } from './SidebarImfDetailPanel.ferdi.js';

export class Sidebar
{
    constructor (mainDiv, settings, imfData)
    {
        this.mainDiv = mainDiv;
        this.panelSet = new PanelSet (mainDiv);

        this.settingsPanel = new SidebarSettingsPanel (this.panelSet.GetContentDiv (), settings);
        this.imfDetailPanel = new SidebarImfDetailPanel (this.panelSet.GetContentDiv (), imfData);

        this.panelSet.AddPanel (this.imfDetailPanel);
        this.panelSet.AddPanel (this.settingsPanel);
        this.panelSet.ShowPanel (this.imfDetailPanel);
    }

    IsPanelsVisible ()
    {
        return this.panelSet.IsPanelsVisible ();
    }

    ShowPanels (show)
    {
        this.panelSet.ShowPanels (show);
    }

    Init (callbacks)
    {
        this.callbacks = callbacks;

        this.panelSet.Init ({
            onResizeRequested : () => {
                this.callbacks.onResizeRequested ();
            },
            onShowHidePanels : (show) => {
                this.callbacks.onShowHidePanels (show);
            }
        });

        this.settingsPanel.Init ({
            getShadingType : () => {
                return this.callbacks.getShadingType ();
            },
            getProjectionMode : () => {
                return this.callbacks.getProjectionMode ();
            },
            getDefaultMaterials : () => {
                return this.callbacks.getDefaultMaterials ();
            },
            onEnvironmentMapChanged : () => {
                this.callbacks.onEnvironmentMapChanged ();
            },
            onBackgroundColorChanged : () => {
                this.callbacks.onBackgroundColorChanged ();
            },
            onDefaultColorChanged : () => {
                this.callbacks.onDefaultColorChanged ();
            },
            onEdgeDisplayChanged : () => {
                this.callbacks.onEdgeDisplayChanged ();
            }
        });
    }

    UpdateControlsStatus ()
    {
        this.settingsPanel.UpdateControlsStatus ();
    }

    UpdateControlsVisibility ()
    {
        this.settingsPanel.UpdateControlsVisibility ();
    }

    Resize (height)
    {
        SetDomElementOuterHeight (this.mainDiv, height);
        this.panelSet.Resize ();
    }

    GetWidth ()
    {
        return GetDomElementOuterWidth (this.mainDiv);
    }

    SetWidth (width)
    {
        SetDomElementOuterWidth (this.mainDiv, width);
    }

    Clear ()
    {
        this.panelSet.Clear ();
    }

    AddObject3DProperties (model, object3D)
    {
        // this.detailsPanel.AddObject3DProperties (model, object3D);
    }

    AddMaterialProperties (material)
    {
        this.detailsPanel.AddMaterialProperties (material);
    }
}
