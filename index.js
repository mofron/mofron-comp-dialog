/**
 * @file   mofron-comp-dialog/index.js
 * @brief dialog component for mofron
 * @author simpart
 */
const mf      = require('mofron');
const Modal   = require('mofron-comp-modalfil');
const Frame   = require('mofron-comp-ttlframe');
const Text    = require('mofron-comp-text');
const Button  = require('mofron-comp-button');
const vsClick = require('mofron-event-visiclick');
const HrzPos  = require('mofron-effect-hrzpos'); 
const VrtPos  = require('mofron-effect-vrtpos');
const SyncHei = require('mofron-effect-synchei');

/**
 * @class mofron.comp.Dialog
 * @brief dialog component class
 */
mf.comp.Dialog = class extends mf.Component {
    
    /**
     * initialize component
     * 
     * @param po paramter or option
     */
    constructor (po) {
        try {
            super();
            this.name('Dialog');
            this.prmMap('title');
            
            this.closeButton(
                new Text({
                    text: '&times;', mainColor: [120,120,120],
                    effect: [
                        new SyncHei(this.frame().header()),
                        new HrzPos('right', '0.1rem')
                    ]
                })
            );
            
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @param prm : 
     */
    initDomConts () {
        try {
            super.initDomConts();
             
            
            /* set close button */
            this.frame().header().child([this.closeButton()]);
            
            this.modal().child([this.frame()]);
            this.child([this.modal(), this.btnWrap()]);
            
            /* update target dom */
            this.target(this.frame().target());
            
            
            //this.style();
            //let btn_ara = new mf.Component({
            //    width : '100%',
            //    child : [
            //        new mf.Component({
            //            width : '0rem', effect : [ new HrzPos('center') ],
            //            style : {'position': 'absolute', 'bottom': '0.2rem'},
            //        })
            //    ]
            //});
            //this.btnTgt(btn_ara.child()[0].target());
            
            //let frame = this.frame();
            //frame.execOption({
            //    child : [
            //        this.header(),
            //        this.contents(),
            //        btn_ara
            //    ]
            //});
            //
            //this.modalfil().execOption({ child : [ frame ] });
            //this.addChild(this.modalfil());
            //
            //this.target(this.contents().target());
            
            /* default size */
            this.size('3.8rem', '2.3rem');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    title (prm) {
        try { return this.frame().text(prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    btnWrap (prm) {
        try {
            if (true === mf.func.isComp(prm)) {
                prm.execOption({ effect: [new VrtPos('bottom')] });
            }
            return this.innerComp('btnWrap', prm, mf.Component);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    button (prm) {
        try { return this.btnWrap().child(prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    autoClose (prm) {
        try { return this.member('autoClose', 'boolean', prm, true); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    closeButton (prm) {
        try {
            if (true === mf.func.isComp(prm)) {
                prm.execOption({ event: [new vsClick('disable',this)] });
            }
            return this.innerComp('closeButton', prm, mf.Component);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    frame (prm) {
        try {
            let ret = this.innerComp('frame', prm, Frame);
            if (undefined !== prm) {
                prm.execOption({
                    mainColor : [230, 230, 230],
                    baseColor : [250, 250, 250],
                    effect    : [ new HrzPos('center'), new VrtPos('center') ],
                });
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    modal (prm) {
       try { return this.innerComp('modal', prm, Modal);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (prm, hdr) {
        try {
            if (undefined !== hdr) { 
                this.frame().header().height(hdr);
            }
            return super.height(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    mainColor (prm) {
        try { return this.frame().header().baseColor(prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    accentColor (prm) {
        try { return this.modal().baseColor(prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.Dialog;
/* end of file */
