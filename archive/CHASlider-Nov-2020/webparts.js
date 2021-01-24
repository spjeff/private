GetPublishedImage = function (publishingImageUri) {
    return new Promise(function (resolve, reject) {

        $.ajax({
            url: publishingImageUri,
            method: 'GET',
            headers:
                {
                    Accept: 'application/json; odata=verbose'
                },
            success: function (data, request) {
                //publishingImage = data.d.APFImage;
                resolve(data);
            },
            error: function (data) {
                console.log("Error in processing request " + data.status);
            }
        });
    });
}

var ChaHMModel = function (result) {
    var self = this;
    self.APFHeading = ko.observable('');
    self.APFBody = ko.observable('');
    self.APFLinkURL = ko.observable('');
    self.APFImage = ko.observable('');

    self.APFOrder = ko.observable('');

    if (result != null) {
        self.APFBody(result.APFBody);

        self.APFHeading(result.APFHeading);
        //self.APFImage = "/sites/cha/Style%20Library/chalibrary/images/img02.jpg";
        self.APFImage = result.APFImage;
        self.APFLinkURL(result.APFLinkURL.Url);
        self.APFOrder(result.APFOrder);
    }

}
var ChaHMFeatureMain = function () {
    var self = this;

    self.featureCollection = ko.observableArray();


    self.getHomeFeatureItems = function () {
        var publishingImage = '';
        var listItems = [];

        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getByTitle('Home Feature')/items?$top=4&$filter=APFActive eq 1&$orderby=APFOrder asc",
            type: "GET",
            headers: { "Accept": "application/json;odata=verbose" },
            success: function (data) {

                for (var j = 0; j < data.d.results.length; j++) {
                    var result = data.d.results[j];

                    // List item retrieved. Fetch the Publishing Image.
                    var publishingImageUri = data.d.results[j].FieldValuesAsHtml.__deferred.uri
                    GetPublishedImage(publishingImageUri).then(function (data) {
                        //publishingImage = data.d.APFImage;
                        result.APFImage = $(data.d.APFImage).attr('src');
                        result.APFHeading = data.d.APFHeading;
                        result.APFBody = data.d.APFBody;
                        result.APFLinkURL.Url = $(data.d.APFLinkURL).attr('href');
                        // data.d.APFLinkURL.substring(data.d.APFLinkURL.search("href=")+6, data.d.APFLinkURL.search(".com")+4);
                        result.APFOrder = data.d.APFOrder;

                        listItems.push(new ChaHMModel(result));
                        //listItems.sort((a, b) => (a.APFOrder() > b.APFOrder()) ? 1 : -1);
                        //listItems.sort(function(a, b){return a.APFOrder() - b.APFOrder()});

                        listItems.sort(function (a, b) {
                                    if (a.APFOrder() > b.APFOrder()) {
                                        return 1;
                                    } else if (a.APFOrder() < b.APFOrder()) {
                                        return -1;
                                    }                
                                    return 0;
                                });

                        //self.featureCollection.push(new ChaHMModel(result));
                        self.featureCollection(listItems);

                    });


                }

                var objChaHMFeatureMainModel =
                    {
                        featureCollection: self.featureCollection
                    };

                if (document.getElementById("divhmFeature") != undefined)            
                    ko.applyBindings(objChaHMFeatureMainModel, document.getElementById("divhmFeature"));
            },
            error: function (data) {

                console.log("Error in processing request " + data.status);
            }
        });

        

    };
}
var ChaHMSuccessStory = function () {
    var self = this;

    self.successStoryCollection = ko.observableArray();




    self.getHomeSuccessStory = function () {
        var publishingImage = '';
        var listItems = [];

        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getByTitle('Success Story')/items?$top=2&$filter=APFActive eq 1&$orderby=APFOrder asc",
            type: "GET",
            headers: { "Accept": "application/json;odata=verbose" },
            success: function (data) {

                for (var j = 0; j < data.d.results.length; j++) {
                    var result = data.d.results[j];

                    // List item retrieved. Fetch the Publishing Image.
                    var publishingImageUri = data.d.results[j].FieldValuesAsHtml.__deferred.uri
                    // Query SharePoint
                    GetPublishedImage(publishingImageUri).then(function (data) {
                        //publishingImage = data.d.APFImage;
                        result.APFImage = $(data.d.APFImage).attr('src');
                        result.APFHeading = data.d.APFHeading;
                        result.APFBody = data.d.APFBody;
                        result.APFLinkURL.Url = $(data.d.APFLinkURL).attr('href');
                        // data.d.APFLinkURL.substring(data.d.APFLinkURL.search("href=")+6, data.d.APFLinkURL.search(".com")+4);
                        result.APFOrder = data.d.APFOrder;
                        //self.successStoryCollection.push(new ChaHMModel(result));

                        listItems.push(new ChaHMModel(result));
                        //listItems.sort((a, b) => (a.APFOrder() > b.APFOrder()) ? 1 : -1);    
                        //listItems.sort(function(a, b){return a.APFOrder() - b.APFOrder()});    

                        listItems.sort(function (a, b) {
                                    if (a.APFOrder() > b.APFOrder()) {
                                        return 1;
                                    } else if (a.APFOrder() < b.APFOrder()) {
                                        return -1;
                                    }                
                                    return 0;
                                });

                        self.successStoryCollection(listItems);
                    });



                }

                var successStoryCollectionModel =
                    {
                        successStoryCollection: self.successStoryCollection
                    };
                if (document.getElementById("divhmSuccessStory") != undefined)
                    ko.applyBindings(successStoryCollectionModel, document.getElementById("divhmSuccessStory"));

            },
            error: function (data) {

                console.log("Error in processing request " + data.status);
            }
        });


    };
}

var ChaHMIndexSlider = function () {
    var self = this;

    self.indexSliderCollection = ko.observableArray();

    self.className = function (index) {
        return index === 0 ? 'item active' : 'item';
    };
    self.getIndexPageSlider = function () {
        var publishingImage = '';
        var listItems = [];

        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl +
                "/blog/_api/web/lists/getByTitle('Posts')/items?$top=3&$orderby=PublishedDate desc",
            type: "GET",
            headers: { "Accept": "application/json;odata=verbose" },
            success: function (data) {

                for (var j = 0; j < data.d.results.length; j++) {
                    var result = data.d.results[j];

                    // List item retrieved. Fetch the Publishing Image.
                    var publishingImageUri = data.d.results[j].FieldValuesAsHtml.__deferred.uri


                    //result.APFImage = data.d.APFImage.substring(data.d.APFImage.search("src=")+5, data.d.APFImage.search(".jpg")+4);
                    GetPublishedImage(publishingImageUri).then(function (r) {
                        var k = new ChaHMModel();
                        k.APFBody = r.d.SubTitle;
                        k.APFHeading = r.d.Title;
                        k.APFImage = $(r.d.APFImage).attr('src');;
                        k.APFLinkURL = _spPageContextInfo.siteAbsoluteUrl + "/blog/Lists/Posts/Post.aspx?ID=" + r.d.ID;
                        //self.indexSliderCollection.push(k);

                        listItems.push(k);
                        //listItems.sort((a, b) => (a.APFOrder() > b.APFOrder()) ? 1 : -1);                
                        //listItems.sort(function(a, b){return a.APFOrder() - b.APFOrder()});    

                        listItems.sort(function (a, b) {
                                    if (a.APFOrder() > b.APFOrder()) {
                                        return 1;
                                    } else if (a.APFOrder() < b.APFOrder()) {
                                        return -1;
                                    }                
                                    return 0;
                                });    
                        self.indexSliderCollection(listItems);

                    });
                }
            },
            error: function (data) {

                console.log("Error in processing request " + data.status);
            }
        });


        var indexSliderCollectionModel =
            {
                indexSliderCollection: self.indexSliderCollection,
                className: function (index) {
                    return index === 0 ? 'item active' : 'item';
                }
            };

        if (document.getElementById("myCarousel") != undefined)
            ko.applyBindings(indexSliderCollectionModel, document.getElementById("myCarousel"));


    };
};

var HomePageBlog = function () {

    self.className = function (index) {
        return index === 0 ? 'item active' : 'item';
    };
    var clientContext;

    var listName = "Posts";
    var camlQuery =
        '<View><Query><Where><Leq><FieldRef Name="PublishedDate" /><Value Type="DateTime"><Today /></Value></Leq></Where><OrderBy><FieldRef Name ="PublishedDate" Ascending="FALSE"/></OrderBy></Query><RowLimit>3</RowLimit></View>';
    AspectSP.WaitForScript("aspectsp.common.js")
        .then(function () {
            clientContext = new SP.ClientContext(_spPageContextInfo.webAbsoluteUrl + "/blog");
            AspectSP.getListitems(clientContext, listName, camlQuery)
                .then(function () {
                    var postsCollection = arguments[0];
                    var posts = [];
                    var blogPostListEnumerator = postsCollection.getEnumerator();
                    var blogPost = {};
                    while (blogPostListEnumerator.moveNext()) {
                        var activeBlogPostitem = blogPostListEnumerator.get_current();

                        // var publisDateRaw = new Date(activeBlogPostitem.get_item("PublishedDate"));

                        var activePost = {
                            blogId: activeBlogPostitem.get_item('ID'),
                            blogTitle: "",
                            APFHeading: activeBlogPostitem.get_item('Title'),
                            APFBody: activeBlogPostitem.get_item('SubTitle'),
                            APFImage: $(activeBlogPostitem.get_item("APFImage")).attr('src'),
                            PublishedDate: activeBlogPostitem.get_item('PublishedDate'),

                            APFLinkURL: _spPageContextInfo.webAbsoluteUrl +
                                "/blog/pages/post.aspx?postid=" +
                                activeBlogPostitem.get_item('ID')

                        };
                        posts.push(activePost);
                    }

                    //posts.sort((a, b) => (a.PublishedDate < b.PublishedDate ? 1 : -1));
                    //posts.sort(function(a, b){return b.PublishedDate - a.PublishedDate});

                    posts.sort(function (a, b) {
                                    if (a.PublishedDate < b.PublishedDate) {
                                        return 1;
                                    } else if (a.PublishedDate > b.PublishedDate) {
                                        return -1;
                                    }                
                                    return 0;
                                });

                    var indexSliderCollectionModel =
                        {                            
                            indexSliderCollection: ko.observableArray(posts),
                            className: function (index) {
                                return index === 0 ? 'item active' : 'item';
                            }
                        };



                    if (document.getElementById("myCarousel") != undefined)
                        ko.applyBindings(indexSliderCollectionModel, document.getElementById("myCarousel"));


                });
        });
}

GetFullMonthName = function (numb) {

    var months = ['January', 'February', 'March', 'April', 'MAY', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    return months[numb];
}


var CalenderEvents = function () {

    var self = this;

    self.getEvents = function () {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('Calendar')/items?$top=5&$orderby=EventDate desc",
            type: "GET",
            headers: { "Accept": "application/json;odata=verbose" },
            success: function (data) {

                RenderCalendar(data);
            }
        });
    }

    GetMonthName = function (numb) {

        var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
            'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        return months[numb - 1];

    }
    
    GetAllEventsLink = function () {

        var allEventsLink = _spPageContextInfo.webAbsoluteUrl + "/Lists/Calendar";
        return allEventsLink;
    }

    ConvertDateTime = function (myArr) {
        var datee = moment.utc(myArr).local().format();
        var dateTime = datee.split("T");

        var date = dateTime[0].split("-");
        var yyyy = date[0];
        var mm = date[1] - 1;
        var dd = date[2];

        var time = dateTime[1].split(":");
        var h = time[0];
        var m = time[1];
        var s = parseInt(time[2]); //get rid of that 00.0;

        return (new Date(yyyy, mm, dd, h, m, s));
    };


    RenderCalendar = function (data) {

        var detailURL = _spPageContextInfo.webAbsoluteUrl + "/Lists/Calendar/DispForm.aspx?ID=";
        var AllDayEventDurationFormatString = "{0} - {1}";
        var EventDurationFormatString = "{0} {1} - {2} {3}";
        var EventDurationHtmlFormatString = "<span style='color: #FFFFFF;'>{0}</span>";
        var EventListingHeadingHtmlFormatString = "<tr><td width='23%'>{0}</td>";
        var allDayEvent = false;
        var eventEndDate = new Date();
        var today = new Date();
        var currentYear = (new Date).getFullYear();
        var currentMonth = (new Date).getMonth() + 1;
        var currentDay = (new Date).getDate();
        var numDaysHaveEvent = 0;
        var ulDiv = '';
        var arrUpcomingEvents = [];

        for (var j = 0; j < data.d.results.length; j++) {
            var item = data.d.results[j];

            var eventStartDate = ConvertDateTime(item.EventDate);
            eventEndDate = ConvertDateTime(item.EndDate);

            var objEvants = {};

            objEvants.day = eventStartDate.getDate();
            objEvants.month = GetMonthName(eventStartDate.getMonth() + 1);
            objEvants.date = eventStartDate.getDate() + " " + GetMonthName(eventStartDate.getMonth() + 1);

            var dayWithEvents = today;
            var dayHasEvent = true;
            numDaysHaveEvent++;
            var itemID = item.ID;

            if (item.fAllDayEvent == null || item.fAllDayEvent == 'undefined') {
                allDayEvent = false;
            }
            else {
                allDayEvent = item.fAllDayEvent;
            }

            var title = item.Title;

            if (title.length > 85)
                title = title.sub.substring(0, 84) + " ...";
            objEvants.title = title;
            objEvants.detailUrl = detailURL + itemID;


            objEvants.duration = GetEventDuration(eventStartDate, eventEndDate, allDayEvent);

            if (item.Location != 'undefined' && item.Location != '')
                objEvants.location = item.Location;
            else
                objEvants.location = '';
            arrUpcomingEvents.push(objEvants);
        }

        var eventsViewModel =
            {
                upcomingEvantsList: ko.observableArray(arrUpcomingEvents)
            };

        if (document.getElementById('eventListingPanel') != undefined)
            ko.applyBindings(eventsViewModel, document.getElementById("eventListingPanel"));

    }

    GetEventDuration = function (startDateTime, endDateTime, allDayEvent) {

        //   console.log( moment(startDateTime).format('hh:mm A') );

        //console.log( moment(endDateTime).format('hh:mm A') );

        //var then = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDay();
        //  then += ' ' + now.getHours() + ':' + now.getMinutes();

        if (allDayEvent)
            return "All Day";
        else
            // return startDateTime.getHours() + ':' + startDateTime.getMinutes()
            //   + '-' + endDateTime.getHours() + ':' + endDateTime.getMinutes();
            return moment(startDateTime).format('hh:mm A') + ' - ' + moment(endDateTime).format('hh:mm A')
    }

};


var CHALink = function () {

    var self = this;

    self.getLinks = function () {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('Links')/items?$top=10",
            type: "GET",
            headers: { "Accept": "application/json;odata=verbose" },
            success: function (data) {

                RenderLinks(data);
            }
        });


    }

    RenderLinks = function (data) {

        var arrLinks = [];

        for (var j = 0; j < data.d.results.length; j++) {
            var item = data.d.results[j];
            var objLink = {};
            var title = item.URL.Description;
            if (title.length > 85)
                title = title.sub.substring(0, 84) + " ...";
            objLink.title = title;
            objLink.url = item.URL.Url;
            arrLinks.push(objLink);
        }
        var linkViewModel =
            {
                linkList: ko.observableArray(arrLinks)
            };

        if (document.getElementById('linkListingPanel') != undefined)
            ko.applyBindings(linkViewModel, document.getElementById("linkListingPanel"));

    }

};


var CHAPostCategory = function () {

    var self = this;

    self.getCategories = function () {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('Categories')/items?$top=8&$filter=APFActive eq 1&$orderby=APFOrder asc",
            type: "GET",
            headers: { "Accept": "application/json;odata=verbose" },
            success: function (data) {

                RenderLinks(data);
            }
        });


    }

    RenderLinks = function (data) {

        var arrLinks = [];

        for (var j = 0; j < data.d.results.length; j++) {
            var item = data.d.results[j];
            var objLink = {};

            objLink.title = item.Title;
            objLink.url = _spPageContextInfo.webAbsoluteUrl + "/Lists/Categories/Category.aspx?CategoryId=" +
                item.Id;
            arrLinks.push(objLink);
        }
        var categoryViewModel =
            {
                categoryItems: ko.observableArray(arrLinks)
            };

        if (document.getElementById('categoryListingPanel') != undefined)
            ko.applyBindings(categoryViewModel, document.getElementById("categoryListingPanel"));

    }

    self.getCategories();

};




var executiveBlogDetailVM = function () {

    var self = this;

    self.blogPostDetailObj = ko.observable({ imageUrl: '', blogTitle: '', postBody: '', blogger: '', title: '', categories: '', author: '' });
    self.getBlogPost = function () {

        var clientContext;
        var activeBlogPostId = APF.WebParts.Utilities.getQueryStringParameter('postid');
        if(activeBlogPostId == undefined || activeBlogPostId == null)
            return true;
        var listName = "Posts";
        var camlQuery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + activeBlogPostId + '</Value></Eq></Where></Query></View>';
        AspectSP.WaitForScript("aspectsp.common.js")
            .then(function () {
                clientContext = new SP.ClientContext(_spPageContextInfo.webAbsoluteUrl);
                AspectSP.getListitems(clientContext, listName, camlQuery)
                    .then(function () {
                        var postsCollection = arguments[0];
                        var posts = [];
                        var blogPostListEnumerator = postsCollection.getEnumerator();


                        while (blogPostListEnumerator.moveNext()) {
                            var activeBlogPostitem = blogPostListEnumerator.get_current();
                            var publisDateRaw = new Date(activeBlogPostitem.get_item("PublishedDate"));

                            var activePost = {
                                blogId: activeBlogPostitem.get_item('ID'),
                                blogTitle: "",
                                APFHeading: activeBlogPostitem.get_item('Title'),
                                APFSummary: activeBlogPostitem.get_item('SubTitle'),
                                PublishedDate: GetFullMonthName(publisDateRaw.getMonth()) + " " + publisDateRaw.getDate() + ", " + publisDateRaw.getFullYear(),
                                Author: activeBlogPostitem.get_item('Author'),
                                APFBody: activeBlogPostitem.get_item('Body'),
                                APFImage: $(activeBlogPostitem.get_item("APFImage")).attr('src'),

                                APFLinkURL: _spPageContextInfo.webAbsoluteUrl +
                                    "/blog/pages/post.aspx?postid=" +
                                    activeBlogPostitem.get_item('ID')

                            };
                            var assignedToVal = activeBlogPostitem.get_item('Author');
                            var userName = assignedToVal.get_lookupValue();
                            activePost.Author = userName;
                            var catName = "";
                            var lookupVals = activeBlogPostitem.get_item("PostCategory"); //get multi lookup value (SP.FieldLookupValue[])
                            for (var i = 0; i < lookupVals.length; i++) {
                                //  console.log(lookupVals[i].get_lookupId()); //print Id
                                console.log(lookupVals[i].get_lookupValue()); //print Value
                                if (i == 0)
                                    catName = lookupVals[i].get_lookupValue();
                                else
                                    catName = catName + ", " + lookupVals[i].get_lookupValue();
                            }
                            activePost.CatgoryName = catName;
                            self.blogPostDetailObj(activePost);
                            break;
                        }

                    });
            });
    };


    self.getBlogPost();
    ko.applyBindings(self, document.getElementById('eBlogDetail'));
}




var MainBlogPosts = function () {
    var clientContext;
    var listName = "Posts";
    var camlQuery =
        '<View><Query><OrderBy><FieldRef Name ="PublishedDate" Ascending="FALSE"/></OrderBy></Query><RowLimit>20</RowLimit></View>';
    AspectSP.WaitForScript("aspectsp.common.js")
        .then(function () {
            clientContext = new SP.ClientContext(_spPageContextInfo.webAbsoluteUrl);
            AspectSP.getListitems(clientContext, listName, camlQuery)
                .then(function () {
                    var postsCollection = arguments[0];
                    var posts = [];
                    var blogPostListEnumerator = postsCollection.getEnumerator();
                    var blogPost = {};
                    while (blogPostListEnumerator.moveNext()) {
                        var activeBlogPostitem = blogPostListEnumerator.get_current();
                        var publisDateRaw = new Date(activeBlogPostitem.get_item("PublishedDate"));
                        var activePost = {
                            blogId: activeBlogPostitem.get_item('ID'),
                            blogTitle: "",
                            APFHeading: activeBlogPostitem.get_item('Title'),
                            APFSummary: activeBlogPostitem.get_item('SubTitle'),
                            PublishedDate: GetFullMonthName(publisDateRaw.getMonth()) + " " + publisDateRaw.getDate() + ", " + publisDateRaw.getFullYear(),
                            Author: activeBlogPostitem.get_item('Author'),
                            APFBody: activeBlogPostitem.get_item('Body'),
                            APFImage: $(activeBlogPostitem.get_item("APFImage")).attr('src'),
                            APFLinkURL: _spPageContextInfo.webAbsoluteUrl + "/pages/post.aspx?postid=" + activeBlogPostitem.get_item('ID')

                        };
                        var assignedToVal = activeBlogPostitem.get_item('Author');
                        var userName = assignedToVal.get_lookupValue();
                        //console.log(userName);
                        activePost.Author = userName;

                        var catName = "";
                        var lookupVals = activeBlogPostitem.get_item("PostCategory"); //get multi lookup value (SP.FieldLookupValue[])
                        for (var i = 0; i < lookupVals.length; i++) {
                            //  console.log(lookupVals[i].get_lookupId()); //print Id
                            console.log(lookupVals[i].get_lookupValue()); //print Value
                            if (i == 0)
                                catName = lookupVals[i].get_lookupValue();
                            else
                                catName = catName + ", " + lookupVals[i].get_lookupValue();
                        }
                        activePost.CategoryName = catName;
                        posts.push(activePost);
                    }
                    var blogPostCollectionModel =
                        {
                            blogPostCollection: ko.observableArray(posts)

                        };

                    if (document.getElementById("eBlogList") != undefined)
                        ko.applyBindings(blogPostCollectionModel, document.getElementById("eBlogList"));
                });
        });
}


var BlogComment = function (id, postId, title, comment, author, crDate) {
    var self = this;
    self.UId = ko.observable(0);
    self.Comment = ko.observable('');
    self.Author = ko.observable('');
    self.Created = ko.observable('');
    self.PostId = ko.observable(0);
    self.AuthorImg = ko.observable();
    self.Title = ko.observable('');
    if (id > 0) {
        self.UId = ko.observable(id);
        self.PostId = ko.observable(postId);
        self.Title = ko.observable(title);
        self.Comment = ko.observable(comment);
        self.Author = ko.observable(author);        
        self.Created = ko.observable(crDate);
    }  
}


var BlogPostComments = function () {

    var self = this;
    self.IsLoaded=ko.observable(false);
    self.arrComments = ko.observableArray();
    self.body=ko.observable('');
    self.getBlogPostComments = function () {

        var postId = APF.WebParts.Utilities.getQueryStringParameter('postid');
        if(postId == undefined || postId == null)
            return true;
        var listName = "Comments";

        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/getByTitle('Comments')/Items?$Select=Created,Title,Body,ID,Author/Title&$expand=Author/Id&$filter=PostTitleId eq " + postId,
            type: "GET",
            headers: { "Accept": "application/json;odata=verbose" },
            success: function (data) {

                self.BindComments(data);
            }
        });

        if(self.IsLoaded()==false)
{
        if (document.getElementById('commentListingPanel') != undefined)
            ko.applyBindings(self, document.getElementById("commentListingPanel"));
            self.IsLoaded(true);
}
    };

    self.BindComments = function (data) {
        var postId = APF.WebParts.Utilities.getQueryStringParameter('postid');
		self.arrComments.removeAll();
        for (var j = 0; j < data.d.results.length; j++) {
            var item = data.d.results[j];
            //  var objComment = {};
            var title = item.Title;
            var formattedCreatedDate = new Date(item.Created);
            item.Created = GetFullMonthName(formattedCreatedDate.getMonth()) + " " + formattedCreatedDate.getDate() + ", " + formattedCreatedDate.getFullYear()
            try {
                var obj = new BlogComment(item.ID, postId, item.Title, item.Body, item.Author.Title, item.Created);
                obj.AuthorImg( _spPageContextInfo.siteAbsoluteUrl +"/Style%20Library/chalibrary/images/noPhoto.jpg");
                self.arrComments.push(obj);
            }
            catch (ex) {
            }
        }      
    }
    
     self.AddComment = function () {

      //  alert('hi add comment');
       

        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Comments')/items",
            type: "POST",
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "content-Type": "application/json;odata=verbose"
            },
            data: JSON.stringify
                ({
                    __metadata:
                        {
                            type: "SP.Data.CommentsListItem"
                        },
                     Title: 'New comments',
            PostTitleId: APF.WebParts.Utilities.getQueryStringParameter('postid'),
            Body: self.body()
                }),

            success: function (data) {
               self.getBlogPostComments();
               self.body('');
            },
            error: function (error) {
                alert(JSON.stringify(error));
            }
        });
    }
}







