/**
 * @file   mofron-comp-dialog/index.js
 * @brief dialog component for mofron
 * @author simpart
 */
const mf      = require('mofron');
const Modal   = require('mofron-comp-modalfil');
const Frame   = require('mofron-comp-frame');
const Header  = require('mofron-comp-appheader');
const Text    = require('mofron-comp-text');
const Button  = require('mofron-comp-button');
const Click   = require('mofron-event-visiswh');
const HrzPos  = require('mofron-effect-hrzpos'); 
const VrtPos  = require('mofron-effect-vrtpos');
const VisiSwh = require('mofron-event-visiswh');

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
            
            let btn_ara = new mf.Component({
                width : '0rem',
                style : {
                    'position' : 'absolute',
                    'bottom'   : '0.2rem'
                },
                effect : [ new HrzPos('center') ]
            });
            this.contents().addChild(btn_ara);
            this.btnTgt(btn_ara.target());
            
            let frame = this.frame();
            frame.execOption({
                child : [
                    this.header(),
                    this.contents()
                ]
            });
            
            this.modalfil().execOption({
                child : [ frame ]
            });
            
            this.addChild(this.modalfil());
            this.target(this.contents().target());
            this.styleTgt(this.frame().target());
            
            /* default size */
            this.size('3.8rem', '2.3rem');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    title (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (1 === this.header().text().length) ? this.header().text()[0] : this.header().text();
            }
            /* setter */
            this.header().text(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    button (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_button) ? [] : this.m_button;
            }
            /* setter */
            if (true === Array.isArray(prm)) {
                for (let pidx in prm) {
                    this.button(prm[pidx]);
                }
                return;
            }
            if (true !== mf.func.isInclude(prm, 'Button')) {
                throw new Error('invalid parameter');
            }
            
            prm.execOption({
                size       : new mf.Param('1rem', '0.3rem'),
                sizeValue  : new mf.Param(
                                 'margin-left',
                                 (0 !== this.button().length) ? '0.3rem' : '0rem'
                             )
            });
            if (true === this.autoClose()) {
                prm.execOption({
                    event : [ new VisiSwh('disable', this) ]
                });
            }
            
            
            this.switchTgt(
                this.btnTgt(),
                (cmp) => {
                    try {
                        let btn_wid = mf.func.getSizeObj(cmp.target().style('width'));
                        cmp.target().style({
                            width : mf.func.sizeSum(btn_wid, prm.width()).toString()
                        });
                        
                        if (0 !== cmp.button().length) {
                            cmp.target().style({
                                width : mf.func.sizeSum(cmp.target().style('width'),'0.3rem').toString()
                            });
                        }
                        
                        cmp.addChild(prm);
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
            );
            
            if (undefined === this.m_button) {
                this.m_button = [];
            }
            this.m_button.push(prm);
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
    
    frame (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                if (undefined === this.m_frame) {
                    this.frame(
                        new Frame({
                            mainColor : new mf.Color(255,255,255),
                            effect    : [ new HrzPos('center'), new VrtPos('center') ],
                        })
                    );
                }
                return this.m_frame;
            }
            /* setter */
            if (true !== mf.func.isInclude(prm, 'Frame')) {
                throw new Error('invalid parameter');
            }
            this.m_frame = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    header (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                if (undefined === this.m_header) {
                    this.header(
                        new Header({
                            height   : '0.42rem',
                            bind     : false,
                            navigate : new Text({
                                text  : '&#x2715;',
                                event : [ new Click('disable', this) ]
                            })
                        })
                    );
                }
                return this.m_header;
            }
            /* setter */
            if (true !== mf.func.isInclude(prm, 'Header')) {
                throw new Error('invalid parameter');
            }
            this.m_header = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    modalfil (prm) {
       try {
           if (undefined === prm) {
               /* getter */
               if (undefined === this.m_mdlfil) {
                   this.modalfil(new Modal({}));
               }
               return this.m_mdlfil;
           } 
           /* setter */
           if (true !== mf.func.isInclude(prm, 'ModalFil')) {
               throw new Error('invalid parameter');
           }
           this.m_mdlfil = prm;
       } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    contents (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                if (undefined === this.m_conts) {
                    this.contents(new mf.Component({ width : '100%' }));
                }
                return this.m_conts;
            }
            /* setter */
            if (true !== mf.func.isInclude(prm, 'Component')) {
                throw new Error('invalid parameter');
            }
            this.m_conts = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    btnTgt (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                if (undefined === this.m_btntgt) {
                    throw new Error('not find target');
                }
                return this.m_btntgt;
            }
            /* setter */
            if (true !== mf.func.isInclude(prm, 'Dom')) {
            }
            this.m_btntgt = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    mainColor (prm) {
        try { return this.header().baseColor(prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    accentColor (prm) {
        try { return this.modalfil().baseColor(prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
}
module.exports = mofron.comp.Dialog;
/* end of file */
