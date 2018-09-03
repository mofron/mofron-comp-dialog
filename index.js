/**
 * @file   mofron-comp-dialog/index.js
 * @brief dialog component for mofron
 * @author simpart
 */
const mf     = require('mofron');
const Modal  = require('mofron-comp-modalfil');
const Frame  = require('mofron-comp-frame');
const Header = require('mofron-comp-appheader');
const Text   = require('mofron-comp-text');
const Button = require('mofron-comp-button');
const Click  = require('mofron-event-visiswh');
const HrzPos = require('mofron-effect-hrzpos'); 
const VrtPos = require('mofron-effect-vrtpos');

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
            
            let header = new Header({
                height   : '0.42rem',
                bind     : false,
                navigate : new Text({
                    text  : '&#x2715;',
                    event : [ new Click('disable', this) ]
                })
            });
            
            let button = new mf.Component({
                style : {
                    'position' : 'absolute',
                    'bottom'   : '0.15rem'
                },
                effect : [ new HrzPos('center') ]
            });
            let frame = new Frame({
                mainColor : new mf.Color(255,255,255),
                effect    : [ new HrzPos('center'), new VrtPos('center') ],
                child     : [
                    header,
                    new mf.Component({
                        addChild : button
                    })
                ]
            });
            
            this.addChild(new Modal({ addChild : frame }));
            this.target(frame.target());
            
            /* default size */
            this.size('3.8rem', '2.3rem');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    title (prm) {
        try {
            let hdr = this.getFrame().child()[0];
            if (undefined === prm) {
                /* getter */
                return (1 === hdr.text().length) ? hdr.text()[0] : hdr.text();
            }
            /* setter */
            hdr.text(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    button (prm, cb, cbp) {
        try {
            if (undefined === prm) {
                /* getter */
                let ret_btn = this.getFrame().child()[1].child();
                return (0 === ret_btn.length) ? null : ret_btn;
            }
            /* setter */
            if (true === Array.isArray(prm)) {
                for (let pidx in prm) {
                    this.addButton(prm[pidx], cb, cbp);
                }
            } else {
                this.addButton(prm, cb, cbp);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addButton (prm, cb, cbp) {
        try {
            let set_val = null;
            if ('string' === typeof prm) {
                set_val = new Button(prm);
            } else if (true === mf.func.isInclude(prm, 'Button')) {
                set_val = prm;
            } else {
                throw new Error('invalid parameter');
            }
            
            if (null !== this.button()) {
                /* set offset */
                set_val.style({ 'margin-left' : '0.15rem' });
            }
            set_val.width(1);
            set_val.clickEvent(cb, cbp);
            set_val.clickEvent(
                (tgt, dlg) => {
                    try {
                        let btn_evt = dlg.buttonEvent();
                        let btn_lst = dlg.button();
                        /* call button event */
                        if (null !== btn_evt) {
                            for (let bidx in btn_lst) {
                                if (tgt.getId() === btn_lst[bidx].getId()) {
                                    btn_evt[0](bidx, btn_evt[1]);
                                }
                            }
                        }
                        /* close dialog */
                        if (true === dlg.autoClose()) {
                            dlg.visible(false);
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                this
            );
            let btn_wrp = this.getFrame().child()[1];
            btn_wrp.addChild(set_val);
            
            /* centering */
            let btn_lst = (null === this.button()) ? [] : this.button();
            let wid     = 0;
            for (let bidx in btn_lst) {
                wid += btn_lst[bidx].width().value();
                /* add offset */
                wid += (0 == bidx) ? 0 : 0.15; 
            }
            if ('number' !== typeof wid) {
                /* could not centering buttons */
                return;
            }
            btn_wrp.width(wid+'rem');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    buttonEvent (fnc, prm) {
        try {
            if (undefined === fnc) {
                /* getter */ 
                return (undefined === this.m_btnevt) ? null : this.m_btnevt;
            }
            /* setter */
            if ('function' !== typeof fnc) {
                throw new Error('invalid parameter');
            }
            this.m_btnevt = new Array(fnc, prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    autoClose (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_atclose) ? true : this.m_atclose;
            }
            /* setter */
            if ('boolean' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            this.m_atclose = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getFrame () {
        try {
            return this.getChild(true)[0].child()[0];
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getHeader () {
        try {
            return this.getFrame().child()[0];
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
}
module.exports = mofron.comp.Dialog;
/* end of file */
