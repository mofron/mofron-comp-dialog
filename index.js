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
                width : '0rem',
                style : {
                    'position' : 'absolute',
                    'bottom'   : '0.2rem'
                },
                effect : [ new HrzPos('center') ]
            });
            let frame = new Frame({
                mainColor : new mf.Color(255,255,255),
                effect    : [ new HrzPos('center'), new VrtPos('center') ],
                child     : [
                    header,
                    new mf.Component({
                        width    : '100%',
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
            
            let thisobj = this;
            prm.execOption({
                size       : new mf.Param('1rem', '0.3rem'),
                sizeValue  : new mf.Param(
                    'margin-left',
                    (0 !== this.button().length) ? '0.3rem' : '0rem'
                ),
                clickEvent : new mf.Param(
                    (tgt, dlg) => {
                        try {
                            if (true === dlg.autoClose()) { dlg.visible(false); }
                        } catch (e) {
                            console.log(e.stack);
                            throw e;
                        }
                    },
                    thisobj
                )
            });
            
            let btn_wrp = this.getFrame().child()[1].child()[0];
            btn_wrp.width(
                mf.func.sizeSum(btn_wrp.width(), prm.width())
            );
            if (0 !== this.button().length) {
                btn_wrp.width(
                    mf.func.sizeSum(btn_wrp.width(), '0.3rem')
                );
            }
            
            btn_wrp.addChild(prm);
            
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
