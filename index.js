/**
 * @file   mofron-comp-dialog/index.js
 * @brief dialog component for mofron
 * @author simpart
 */
let mf = require('mofron');
let Modal = require('mofron-comp-modalfil');
let Frame = require('mofron-comp-frame');
let Header = require('mofron-comp-ttlhdr');
let Text = require('mofron-comp-text');
let Button = require('mofron-comp-button');
/* event */
let Click = require('mofron-event-click');

/* effect */
let efCenter = require('mofron-effect-center');

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
    initDomConts (prm) {
        try {
            super.initDomConts(); 
            
            let header = new Header({
                title    : prm,
                height   : 30,
                bind     : false,
                addChild : new Text({
                    style : {
                        'margin-left'  : 'auto',
                        'margin-right' : '10px'
                    },  
                    text     : '&#x2715;',
                    addEvent : new Click(
                        (tgt, dlg) => {
                            try {
                                dlg.visible(false);
                            } catch (e) {
                                console.error(e.stack);
                                throw e;
                            }
                        },
                        this
                    )
                })
            });
            
            let button = new mf.Component({
                style : {
                    'position' : 'absolute',
                    'bottom'   : '15px'
                },
                addEffect : new efCenter({
                    enableFlag : new mf.Param(true,false),
                    posiType   : 'absolute'
                })
            });
            let frame = new Frame({
                color     : new mf.Color(255,255,255),
                addEffect : new efCenter(),
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
            this.size(380, 230);
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
                return (1 === hdr.title().length) ? hdr.title()[0] : hdr.title();
            }
            /* setter */
            hdr.title(prm);
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
                set_val.style({ 'margin-left' : '15px' });
            }
            set_val.width(100);
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
                wid += btn_lst[bidx].width();
                /* add offset */
                wid += (0 == bidx) ? 0 : 15; 
            }
            if ('number' !== typeof wid) {
                /* could not centering buttons */
                return;
            }
            btn_wrp.width(wid);
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
    
    color (prm, cnt) {
        try {
            if (undefined !== cnt) {
                /* contents color setter */
                super.color(cnt);
            }
            return this.getHeader().color(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }   
}
module.exports = mofron.comp.Dialog;
/* end of file */
