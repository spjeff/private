Function.registerNamespace('Brandes.GlobalNavigation');


var Hcf = Hcf || {};
Hcf.Util = Hcf.Util || {};
Hcf.Util.Termset = Hcf.Util.Termset || {};

//Global Array and Variables declaration
Brandes.GlobalNavigation.path = {
    allpaths: []
};
Brandes.GlobalNavigation.grouplength = 0;
Brandes.GlobalNavigation.count = 0;
Brandes.GlobalNavigation.Resourcescolcount = 0;
Brandes.GlobalNavigation.Supportcolcount = 0;
Brandes.GlobalNavigation.Resourcelastchild = '';
Brandes.GlobalNavigation.Supportlastchild = '';
Brandes.GlobalNavigation.menutypevalue = '';


//Loading terms from termstore
Brandes.GlobalNavigation.init = function () {

    var Hcf = Hcf || {};
    Hcf.Util = Hcf.Util || {};
    Hcf.Util.Termset = Hcf.Util.Termset || {};

    (function (module) {

        /**
         * Returns a termset, based on ID
         *
         * @param {string} id - Termset ID
         * @param {object} callback - Callback function to call upon completion and pass termset into
         */
        module.getTermSet = function (id, callback) {
            SP.SOD.loadMultiple(['sp.js'], function () {
                SP.SOD.registerSod('sp.taxonomy.js', SP.Utilities.Utility.getLayoutsPageUrl('sp.taxonomy.js'));
                SP.SOD.loadMultiple(['sp.taxonomy.js'], function () {
                    var ctx = SP.ClientContext.get_current(),
                        taxonomySession = SP.Taxonomy.TaxonomySession.getTaxonomySession(ctx),
                        termStore = taxonomySession.getDefaultSiteCollectionTermStore(),
                        termSet = termStore.getTermSet(id),
                        terms = termSet.getAllTerms();

                    ctx.load(terms);

                    ctx.executeQueryAsync(Function.createDelegate(this, function (sender, args) {
                        callback(terms);
                    }),

                        Function.createDelegate(this, function (sender, args) { }));
                });
            });
        };


        /**
         * Returns an array object of terms as a tree
         *
         * @param {string} id - Termset ID
         * @param {object} callback - Callback function to call upon completion and pass termset into
         */
        module.getTermSetAsTree = function (id, callback) {
            module.getTermSet(id, function (terms) {
                var termsEnumerator = terms.getEnumerator(),
                    tree = {
                        term: terms,
                        children: []
                    };

                // Loop through each term
                while (termsEnumerator.moveNext()) {
                    var currentTerm = termsEnumerator.get_current();
                    var termname = currentTerm.get_name();
                    var termguid = currentTerm.get_id();
                    var currentTermPath = currentTerm.get_pathOfTerm().split(';');
                    var menutype = currentTerm.get_objectData().get_properties()["LocalCustomProperties"].type;
                    var newtabmenu = currentTerm.get_objectData().get_properties()["LocalCustomProperties"].newtab;
                    var simpleLinkUrl = currentTerm.get_localCustomProperties()._Sys_Nav_SimpleLinkUrl;
                    var children = tree.children;

                    var currenttermpath = {
                        currentTermPath: currentTermPath,
                        termname: termname,
                        termguid: termguid,
                        simpleLinkUrl: simpleLinkUrl,
                        menutype: menutype,
                        newtabmenu: newtabmenu
                    };
                    Brandes.GlobalNavigation.path.allpaths.push(currenttermpath);

                    // Loop through each part of the path
                    for (var i = 0; i < currentTermPath.length; i++) {
                        var foundNode = false;

                        for (var j = 0; j < children.length; j++) {
                            if (children[j].name === currentTermPath[i]) {
                                foundNode = true;
                                break;
                            }
                        }

                        // Select the node, otherwise create a new one
                        var term = foundNode ? children[j] : { name: currentTermPath[i], children: [] };

                        // If we're a child element, add the term properties
                        if (i === currentTermPath.length - 1) {
                            term.term = currentTerm;
                            term.title = currentTerm.get_name();
                            term.guid = currentTerm.get_id().toString();
                        }

                        // If the node did exist, let's look there next iteration
                        if (foundNode) {
                            children = term.children;
                        }
                        // If the segment of path does not exist, create it
                        else {
                            children.push(term);

                            // Reset the children pointer to add there next iteration
                            if (i !== currentTermPath.length - 1) {
                                children = term.children;
                            }
                        }
                    }
                }

                tree = module.sortTermsFromTree(tree);

                callback(tree);
            });
        };


        /**
         * Sort children array of a term tree by a sort order
         *
         * @param {obj} tree The term tree
         * @return {obj} A sorted term tree
         */
        module.sortTermsFromTree = function (tree) {
            // Check to see if the get_customSortOrder function is defined. If the term is actually a term collection,
            // there is nothing to sort.
            if (tree.children.length && tree.term.get_customSortOrder) {
                var sortOrder = null;

                if (tree.term.get_customSortOrder()) {
                    sortOrder = tree.term.get_customSortOrder();
                }

                // If not null, the custom sort order is a string of GUIDs, delimited by a :
                if (sortOrder) {
                    sortOrder = sortOrder.split(':');

                    tree.children.sort(function (a, b) {
                        var indexA = sortOrder.indexOf(a.guid);
                        var indexB = sortOrder.indexOf(b.guid);

                        if (indexA > indexB) {
                            return 1;
                        } else if (indexA < indexB) {
                            return -1;
                        }

                        return 0;
                    });
                }
                // If null, terms are just sorted alphabetically
                else {
                    tree.children.sort(function (a, b) {
                        if (a.title > b.title) {
                            return 1;
                        } else if (a.title < b.title) {
                            return -1;
                        }

                        return 0;
                    });
                }
            }

            for (var i = 0; i < tree.children.length; i++) {
                tree.children[i] = module.sortTermsFromTree(tree.children[i]);
            }

            return tree;
        };

        function renderTerm(term, firstLevel) {
            var isFaq = false;
            var html = '';
            //Loading Term Paths
            //var path = Brandes.GlobalNavigation.path.allpaths.find(function (obj) { return obj.termguid._m_guidString$p$0 === term.guid; });
            var path = '';
            var fullpath = '';
            var firstlevelpath = '';
            var secondlevelpath = '';
            var newtabmenu = '';
            var termurl = '';
            var ismenutype = '';
            var found = false;
            for (m = 0; m < Brandes.GlobalNavigation.path.allpaths.length; m++) {
                if (Brandes.GlobalNavigation.path.allpaths[m].termguid._m_guidString$p$0 === term.guid) {
                    fullpath = Brandes.GlobalNavigation.path.allpaths[m].currentTermPath[0];
                    firstlevelpath = Brandes.GlobalNavigation.path.allpaths[m].currentTermPath[1];
                    secondlevelpath = Brandes.GlobalNavigation.path.allpaths[m].currentTermPath[2];
                    termurl = Brandes.GlobalNavigation.path.allpaths[m].simpleLinkUrl;
                    ismenutype = Brandes.GlobalNavigation.path.allpaths[m].menutype;
                    newtabmenu = Brandes.GlobalNavigation.path.allpaths[m].newtabmenu;
                    found = true;
                    break;
                }
            }

            var grouplength;
            var count;
            //Starts Department Element
            if (ismenutype == 'Isdropdown') {
                html = '<li class="dropdown"><a class="dropdown-toggle">' + term.title + '<b class="sprite down-arrow"></b></a>';
                Brandes.GlobalNavigation.menutypevalue = ismenutype;
            }
            //Starts RESOURCES and Support Element
            else if (ismenutype == 'IsColumnLayout') {
                html = '<li class="dropdown yamm-fw"><a class="dropdown-toggle">' + term.title + '<b class="sprite down-arrow"></b></a>';
                Brandes.GlobalNavigation.menutypevalue = ismenutype;
            }

            //Start HOME Element
            else if (ismenutype == 'NoChildren') {
                html = '<li class="dropdown"><a class="dropdown-toggle" href="' + termurl + '">' + term.title + '</a>';
                Brandes.GlobalNavigation.menutypevalue = ismenutype;
            }


            //Rendering all children for Department Elements
            if (Brandes.GlobalNavigation.menutypevalue == 'Isdropdown') {
                if (term.children && term.children.length) {
                    if (term.children[0].children && term.children[0].children.length) {
                        if (firstlevelpath != undefined) {
                            html += '<li class="dropdown-submenu"><a href="' + termurl + '">' + term.title + '</a><ul class="dropdown-menu multi-level"><li>';
                        }

                        else {
                            html += '<ul class="dropdown-menu multi-level">';
                        }
                    }

                    else {
                        if (firstlevelpath != undefined) {
                            html += '<li class="dropdown-submenu"><a href="' + termurl + '">' + term.title + '</a><ul class="dropdown-menu multi-level"><li>';
                        }
                        else {
                            html += '<ul class="dropdown-menu multi-level">';
                        }
                    }

                    for (var i = 0; i < term.children.length; i++) {
                        html += renderTerm(term.children[i]);
                    }

                    html += '</li></ul>';
                }
                else {
                    if (firstlevelpath != undefined) {
                        html += '<li><a href="' + termurl + '">' + term.title + '</a>';
                    }
                    else {
                        html += '<ul class="dropdown-menu multi-level">';
                    }
                }

            }

            //Rendering all children for Resources and Support Elements
            else if (Brandes.GlobalNavigation.menutypevalue == 'IsColumnLayout') {
                var evenodd = false;
                if (term.children && term.children.length) {
                    if (Brandes.GlobalNavigation.Resourcelastchild == "") {
                        Brandes.GlobalNavigation.Resourcelastchild = term.children[term.children.length - 1].name;
                    }
                    if (Brandes.GlobalNavigation.Resourcescolcount > 0) {
                        if (Brandes.GlobalNavigation.Resourcescolcount % 2 == 0) {
                            evenodd = true;
                        }
                        else {
                            evenodd = false;
                        }
                    }
                    if (Brandes.GlobalNavigation.Resourcescolcount > 0 && evenodd == false && term.children && term.children.length) {
                        html += '</li></ul></div><div class="col-md-3" id=col' + Brandes.GlobalNavigation.Resourcescolcount + '><ul class="list-unstyled megamenu-list"><li><a href="#">' + term.title + '<b></b></a><ul class="list-unstyled megamenu-sublist">';
                        Brandes.GlobalNavigation.Resourcescolcount++;
                    }

                    else if (Brandes.GlobalNavigation.Resourcescolcount > 0 && term.children && term.children.length) {
                        html += '</ul></li><li><a href="#">' + term.title + '<b></b></a><ul class="list-unstyled megamenu-sublist">';
                        Brandes.GlobalNavigation.Resourcescolcount++;
                    }

                    else {
                        html += '<ul class="dropdown-menu"><li class="mega-content"><div class="row"><div class="col-md-3" id=col' + Brandes.GlobalNavigation.Resourcescolcount + '><ul class="list-unstyled megamenu-list">';
                        Brandes.GlobalNavigation.Resourcescolcount++;
                    }


                    for (var i = 0; i < term.children.length; i++) {
                        var level = firstlevelpath !== "" || firstlevelpath !== undefined ? firstlevelpath : firstLevel;
                        Brandes.GlobalNavigation.grouplength = term.children.length;
                        Brandes.GlobalNavigation.count = i;
                        html += renderTerm(term.children[i], level);
                    }
                }
                else {
                    if (newtabmenu == '1' && newtabmenu != undefined) {
                        html += '<li><a href="' + termurl + '" target="_blank">' + term.title + '</a>';
                        if ((firstLevel == Brandes.GlobalNavigation.Resourcelastchild) && (Brandes.GlobalNavigation.count + 1) == (Brandes.GlobalNavigation.grouplength)) {
                            html += "</ul></li></ul></div></li></ul>";
                            Brandes.GlobalNavigation.Resourcescolcount = 0;
                        }
                    }
                    else if (newtabmenu != '1' || newtabmenu == undefined) {
                        html += '<li><a href="' + termurl + '">' + term.title + '</a>';
                        if ((firstLevel == Brandes.GlobalNavigation.Resourcelastchild) && (Brandes.GlobalNavigation.count + 1) == (Brandes.GlobalNavigation.grouplength)) {
                            html += "</ul></li></ul></div></li></ul>";
                            Brandes.GlobalNavigation.Resourcescolcount = 0;
                        }

                    }

                }

            }
            return html + '</li>';
        }
		function loadmegamenujs(){
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.src = "https://brandes365.sharepoint.com/_catalogs/masterpage/Style Library/megamenu.v.1.0_common.js";
		script.type = 'text/javascript';
		head.appendChild(script);
		}
        module.getTermSetAsTree('d30b3d34-f12d-4c17-8711-dae4e3df29c0', function (terms) {
            var html = '';

            // Kick off the term rendering
            for (var i = 0; i < terms.children.length; i++) {
                html += renderTerm(terms.children[i], "");
            }

            // Append the create HTML to the bottom of the page
            var list = document.createElement('ul');
            list.className = ('nav navbar-nav');
            list.innerHTML = html;
            var navdiv = document.getElementById("navbar-collapse-grid")
            navdiv.appendChild(list);
            if(_spPageContextInfo.siteServerRelativeUrl == "/sites/pmcs"){
		//	        window.setTimeout(function () {
            $('#megamenucontainer .yamm .nav li.dropdown').hover(
                function () { $(this).addClass('open') },
                function () { $(this).removeClass('open') }
            )
        //}, 1000);
            }
            else if(_spPageContextInfo.siteServerRelativeUrl != "/sites/pmcs"){
            loadmegamenujs();
            }
            
			//document.writeln('<script type="text/javascript" src="https://brandes365.sharepoint.com/_catalogs/masterpage/Style Library/megamenu.v.1.0_common.js" ></script>');
        });
    })(Hcf.Util.Termset);
};
