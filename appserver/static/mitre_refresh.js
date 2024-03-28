require([
   "jquery",
   "splunkjs/mvc",
   "splunkjs/mvc/searchmanager",
   "splunkjs/mvc/simplexml/ready!"
 ], function(
     $,
     mvc,
     SearchManager
 ) {
    currenturl = window.location.href.split("/")
    viewname = "|mitredata file="+currenturl[currenturl.length - 1]
    console.log("i am in ",viewname)
     var mysearch = new SearchManager({
         id: "mysearch",
         autostart: "false",
         search: viewname 
     });

     $(".refresh").on("click", function (){
        $(".dashboard-dashboardpage").addClass("cover-spin");
        $(".dashboard-body").addClass("dashboard-body-dup");
        mysearch.startSearch();
        const results = mysearch.data("results");

        results.on("data", () => {
            if (results.hasData()) {
                var ok = confirm("Data is updated...Do you want to refresh the dashboard now??");
                if(ok == true)
                location.reload();
                else
                {
                    $(".dashboard-dashboardpage").removeClass("cover-spin");
                    $(".dashboard-body").removeClass("dashboard-body-dup");
                }
                
            }
        });
     });
     mvc.Components.revokeInstance("mysearch");
});