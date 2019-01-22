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
const Click   = require('mofron-event-click');
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
            
            /* set frame contents */
            this.modal().child([this.frame()]);
            let conts = new mf.Component();
            this.frame().child([conts, this.btnWrap()]);
            
            /* set modal */
            this.child([this.modal()]);
            
            /* update target dom */
            this.target(conts.target());
            this.styleTgt(this.frame().target());
            
            /* default size */
            this.size('3.8rem', '2.8rem');
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
                prm.execOption({ effect: [new VrtPos('bottom', '0.3rem'), new HrzPos('center')] });
            }
            return this.innerComp('btnWrap', prm, mf.Component);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    button (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.btnWrap().child();
            }
            /* setter */
            if (true === Array.isArray(prm)) {
                for (let bidx in prm) { 
                    this.button(prm[bidx]);
                }
                return;
            }
            let evt = (btn, clk, prm) => {
                try {
                    let btn_evt = prm.buttonEvent();
                    for (let bidx in btn_evt) {
                        btn_evt[bidx][0](btn, clk, btn_evt[bidx][1]);
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            prm.execOption({
                width: '1rem',
                event: [new Click([evt, this])]
            });
            
            let btn_chd = this.btnWrap().child();
            if (0 !== btn_chd.length) {
                prm.execOption({ sizeValue: ['margin-left', '0.2rem'] });
            }
            this.btnWrap().child(prm);
            this.btnWrap().width((btn_chd.length + ((btn_chd.length-1) * 0.2)) + 'rem');
            
            return this.btnWrap().child(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    buttonEvent (fnc, prm) {
        try {
            if (undefined === fnc) {
                /* getter */
                return (undefined === this.m_btnevt) ? [] : this.m_btnevt;
            }
            /* setter */
            if ('function' !== typeof fnc) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_btnevt) {
                this.m_btnevt = [];
            }
            this.m_btnevt.push([fnc, prm]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    //autoClose (prm) {
    //    try { return this.member('autoClose', 'boolean', prm, true); } catch (e) {
    //        console.error(e.stack);
    //        throw e;
    //    }
    //}
    
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
                    header: new mf.Option({ height: '0.4rem' }),
                    mainColor : [230, 230, 230], baseColor : 'white',
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
