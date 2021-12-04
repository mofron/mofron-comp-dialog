/**
 * @file mofron-comp-jspreadsheet/index.js
 * @brief jspreadsheet component for mofron
 * @license MIT
 */
const jspreadsheet = require('jspreadsheet-ce');

module.exports = class extends mofron.class.Component {
    /**
     * initialize component
     * 
     * @param (mixed) string: label text
     *                key-value: component config
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("Jspreadsheet");
            
            this.confmng().add("data",  { list: true, type: "array" });
            this.confmng().add("head",  { list: true, type: "string" });
            this.confmng().add("core",  { type: "object" });
            this.confmng().add("param", { type: "key-value" });
            
	    /* init config */
	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    head (prm) {
        try {
            return this.confmng("head",prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    data (prm) {
        try {
            return this.confmng("data", prm);
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    }

    spreadParam (prm) {
        try {
	    return this.confmng("param", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    afterRender () {
        try {
            super.afterRender();
            
            let dat     = this.confmng("data");
	    let set_dat = [];
            
            for (let row=0; row < dat[0].length; row++) {
	        set_dat.push([]);
            }
            
            for (let didx=0; didx < set_dat.length ; didx++) {
                for (let didx_2=0; didx_2 < dat.length; didx_2++) {
                    set_dat[didx].push(dat[didx_2][didx]);
                }
	    }
            
	    let hed      = this.confmng("head");
            let set_head = [];
	    for (let hidx in hed) {
                set_head.push({ title:hed[hidx], type:'text', width:150 });
	    }
            
	    let set_param = {
                data: set_dat,
		columns: set_head
	    };
            let spd_prm = this.confmng("param");
            for (let pidx in spd_prm) {
                set_param[pidx] = spd_prm[pidx];
	    }
	    this.confmng(
	        "core",
	        jspreadsheet(this.childDom().getRawDom(), set_param)
            );
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getSpreadCore () {
        try {
            return this.confmng("core");
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
