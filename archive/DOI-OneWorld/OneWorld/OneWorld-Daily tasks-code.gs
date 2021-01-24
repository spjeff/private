


var address = '35.232.222.31';
var user = 'ONEWORLDUSER';
var userPwd = 'Oneaugust_18r';
var db = 'ONEWORLD';

var dbUrl = 'jdbc:mysql://' + address + '/' + db;
//Constuctor for main row objects used by the minerals & global interfaces
function Row(country, commodity, type, phase, measure_production, measure_content, form, subform, unit,unit_short, Commodity_Description, Country_Description, multiplier,
             year1_v1_value_prelim, year1_v1_e_prelim, year1_v1_source_prelim, year1_v3_value_prelim, year1_v3_e_prelim, year1_v3_source_prelim, 
             year1_current_value, year1_current_e, year1_current_source, year1_v1_prior_value, year1_v3_prior_value, 
             year1_v1_footnote_1, year1_v1_footnote_2, year1,
             year2_v1_value_prelim, year2_v1_e_prelim, year2_v1_source_prelim, year2_v3_value_prelim, year2_v3_e_prelim, year2_v3_source_prelim, 
             year2_current_value, year2_current_e, year2_current_source, year2_v1_prior_value, year2_v3_prior_value, 
             year2_v1_footnote_1, year2_v1_footnote_2,year2,
             year3_v1_value_prelim, year3_v1_e_prelim, year3_v1_source_prelim, year3_v3_value_prelim, year3_v3_e_prelim, year3_v3_source_prelim,
             year3_current_value, year3_current_e, year3_current_source, year3_v1_prior_value, year3_v3_prior_value,
             year3_v1_footnote_1, year3_v1_footnote_2, year3,
             year4_v1_value_prelim, year4_v1_e_prelim, year4_v1_source_prelim, year4_v3_value_prelim, year4_v3_e_prelim, year4_v3_source_prelim, 
             year4_current_value, year4_current_e, year4_current_source, year4_v1_prior_value, year4_v3_prior_value, 
             year4_v1_footnote_1, year4_v1_footnote_2, year4,
             year5_v1_value_prelim, year5_v1_e_prelim, year5_v1_source_prelim, year5_v3_value_prelim, year5_v3_e_prelim, year5_v3_source_prelim, 
             year5_current_value, year5_current_e, year5_current_source, year5_v1_prior_value, year5_v3_prior_value, 
             year5_v1_footnote_1, year5_v1_footnote_2,year5, key,  FOOTNOTE_VOLUME_1A, FOOTNOTE_VOLUME_1B, FOOTNOTE_VOLUME_3A, FOOTNOTE_VOLUME_3B, industry, confirm, commodity_group,
             key_year1,key_year2,key_year3,key_year4,key_year5,year1_status,year2_status,year3_status,year4_status,year5_status,supress
            )
{ 
this.country=country;
this.commodity=commodity;
this.type=type;
this.phase=phase;
this.measure_production=measure_production;
this.measure_content=measure_content;
this.form=form;
this.subform=subform;
this.unit=unit;
      this.unit_short=unit_short;

this.Commodity_Description=Commodity_Description;
this.Country_Description=Country_Description;
  this.multiplier=multiplier
this.year1_v1_value_prelim=year1_v1_value_prelim;
this.year1_v1_e_prelim=year1_v1_e_prelim;
this.year1_v1_source_prelim=year1_v1_source_prelim;
this.year1_v3_value_prelim=year1_v3_value_prelim;
this.year1_v3_e_prelim=year1_v3_e_prelim;
this.year1_v3_source_prelim=year1_v3_source_prelim;
this.year1_current_value=year1_current_value;
this.year1_current_e=year1_current_e;
this.year1_current_source=year1_current_source;
this.year1_v1_prior_value=year1_v1_prior_value;
this.year1_v3_prior_value=year1_v3_prior_value;
this.year1_v1_footnote_1=year1_v1_footnote_1;
this.year1_v1_footnote_2=year1_v1_footnote_2;
  
  this.year1=year1;
  
this.year2_v1_value_prelim=year2_v1_value_prelim;
this.year2_v1_e_prelim=year2_v1_e_prelim;
this.year2_v1_source_prelim=year2_v1_source_prelim;
this.year2_v3_value_prelim=year2_v3_value_prelim;
this.year2_v3_e_prelim=year2_v3_e_prelim;
this.year2_v3_source_prelim=year2_v3_source_prelim;
this.year2_current_value=year2_current_value;
this.year2_current_e=year2_current_e;
this.year2_current_source=year2_current_source;
this.year2_v1_prior_value=year2_v1_prior_value;
this.year2_v3_prior_value=year2_v3_prior_value;
this.year2_v1_footnote_1=year2_v1_footnote_1;
this.year2_v1_footnote_2=year2_v1_footnote_2;
  
  this.year2=year2;
  
this.year3_v1_value_prelim=year3_v1_value_prelim;
this.year3_v1_e_prelim=year3_v1_e_prelim;
this.year3_v1_source_prelim=year3_v1_source_prelim;
this.year3_v3_value_prelim=year3_v3_value_prelim;
this.year3_v3_e_prelim=year3_v3_e_prelim;
this.year3_v3_source_prelim=year3_v3_source_prelim;
this.year3_current_value=year3_current_value;
this.year3_current_e=year3_current_e;
this.year3_current_source=year3_current_source;
this.year3_v1_prior_value=year3_v1_prior_value;
this.year3_v3_prior_value=year3_v3_prior_value;
this.year3_v1_footnote_1=year3_v1_footnote_1;
this.year3_v1_footnote_2=year3_v1_footnote_2;
  
  this.year3=year3;
  
this.year4_v1_value_prelim=year4_v1_value_prelim;
this.year4_v1_e_prelim=year4_v1_e_prelim;
this.year4_v1_source_prelim=year4_v1_source_prelim;
this.year4_v3_value_prelim=year4_v3_value_prelim;
this.year4_v3_e_prelim=year4_v3_e_prelim;
this.year4_v3_source_prelim=year4_v3_source_prelim;
this.year4_current_value=year4_current_value;
this.year4_current_e=year4_current_e;
this.year4_current_source=year4_current_source;
this.year4_v1_prior_value=year4_v1_prior_value;
this.year4_v3_prior_value=year4_v3_prior_value;
this.year4_v1_footnote_1=year4_v1_footnote_1;
this.year4_v1_footnote_2=year4_v1_footnote_2;
  
  this.year4=year4;
  
this.year5_v1_value_prelim=year5_v1_value_prelim;
this.year5_v1_e_prelim=year5_v1_e_prelim;
this.year5_v1_source_prelim=year5_v1_source_prelim;
this.year5_v3_value_prelim=year5_v3_value_prelim;
this.year5_v3_e_prelim=year5_v3_e_prelim;
this.year5_v3_source_prelim=year5_v3_source_prelim;
this.year5_current_value=year5_current_value;
this.year5_current_e=year5_current_e;
this.year5_current_source=year5_current_source;
this.year5_v1_prior_value=year5_v1_prior_value;
this.year5_v3_prior_value=year5_v3_prior_value;
this.year5_v1_footnote_1=year5_v1_footnote_1;
this.year5_v1_footnote_2=year5_v1_footnote_2;
  
  this.year5=year5;
this.key=key;
  this.FOOTNOTE_VOLUME_1A=FOOTNOTE_VOLUME_1A; 
  this.FOOTNOTE_VOLUME_1B=FOOTNOTE_VOLUME_1B; 
  this.FOOTNOTE_VOLUME_3A=FOOTNOTE_VOLUME_3A; 
  this.FOOTNOTE_VOLUME_3B=FOOTNOTE_VOLUME_3B; 
  this.industry=industry; 
  this.confirm=confirm; 
  
  this.commodity_group=commodity_group;

  this.key_year1=key_year1;
    this.key_year2=key_year2;
  this.key_year3=key_year3;
  this.key_year4=key_year4;
      this.key_year5=key_year5;
        this.year1_status=year1_status
          this.year2_status=year2_status
               this.year3_status=year3_status
     this.year4_status=year4_status
                    this.year5_status=year5_status
                    this.supress=supress
}
function revisionsExpiredCheck(){
     var conn = Jdbc.getConnection(dbUrl, user, userPwd);

    var list=[];

 var stmt = conn.prepareStatement("select TIME, `key` from DATA_REVISIONS where Status='In Progress' and TIME!='null'")
var stmt_exp = conn.prepareStatement(" UPDATE DATA_REVISIONS SET Status ='Expired' WHERE key=?")
  var result = stmt.executeQuery();
  while(result.next()){
    list.push({due:result.getString("TIME"),key:result.getString('key'),status:'In Progress'})
    
  }
  
    for(i=0;i<list.length;i=i+1){
      if (now>list[i].due){
        stmt_exp.setString(list[i].key)
        stmt_exp.executeUpdate()
      //Send Email  
       
      }
  }
}
function finishedCheck(){
  
   var conn = Jdbc.getConnection(dbUrl, user, userPwd);
  var list=[];
  var stmt_fin_chk1= conn.prepareStatement("select * from STRUCT_V1 where Status= 'R' \
        AND filter_commodity NOT IN (SELECT DISTINCT \
            commodity \
        FROM\
            PRODUCTION_DATA \
        WHERE \
            (STATUS = 'GLOBAL1' \
                OR STATUS = 'MINERAL2' \
                OR STATUS = 'SUPERVISOR'))")
  
    var stmt_fin_chk2= conn.prepareStatement(" select * from STRUCT_V3 WHERE \
    STATUS = 'R' \
        AND country NOT IN (SELECT DISTINCT \
            country \
        FROM \
            PRODUCTION_DATA \
        WHERE \
            (STATUS = 'GLOBAL2' \
                OR STATUS = 'MINERAL1' \
                OR STATUS = 'SUPERVISOR'))")
    
 var result = stmt_fin_chk1.executeQuery();
  while(result.next()){
    list.push({table:(result.getString('commodity')),specialist:(result.getString('specialist')),volume:'m'})
    
  }
   var result = stmt_fin_chk2.executeQuery();
  while(result.next()){
    list.push({table:(result.getString('country')),specialist:(result.getString('specialist')),volume:'g'})
    
  }
  for(i=0;i<list.length;i=i+1){
   var elt= createSheetFor(list[i].table,2018,list[i].volume);
   sendFinishedEmail(list[i].table,list[i].specialist,true,elt); 
  }
  var stmt_finished1 = conn.prepareStatement("UPDATE ONEWORLD.STRUCT_V1 \
SET \
    status = 'T',\
    rec_stage1 = CURDATE() \
WHERE\
    STATUS = 'R'\
        AND filter_commodity NOT IN (SELECT DISTINCT \
            commodity \
        FROM\
            PRODUCTION_DATA \
        WHERE \
            (STATUS = 'GLOBAL1' \
                OR STATUS = 'MINERAL2' \
                OR STATUS = 'SUPERVISOR'))");
  
   var stmt_finished2 = conn.prepareStatement("UPDATE ONEWORLD.STRUCT_V3 \
SET \
    status = 'T',\
    rec_stage1 = CURDATE() \
WHERE\
    STATUS = 'R'\
        AND country NOT IN (SELECT DISTINCT\
            country\
        FROM\
            PRODUCTION_DATA\
        WHERE\
            (STATUS = 'GLOBAL2'\
                OR STATUS = 'MINERAL1'\
                OR STATUS = 'SUPERVISOR'))");
  stmt_finished1.executeUpdate();
    stmt_finished2.executeUpdate();

}
function tester (){
  createSheetFor('afghanistan',2018,'g');
}
function createSheetFor(table,year,volume){


  var elt =  JSON.stringify(getData(table,year,volume))
   
  //  var wb = XLSX.utils.book_new();
   // var ws1 = XLSX.utils.json_to_sheet(elt)






   // XLSX.utils.book_append_sheet(wb, ws1, "Data");

//var wopts = { bookType:'xlsx', bookSST:false, type:'buffer' };

//var wbout = XLSX.write(wb,wopts);
//  MailApp.sendEmail('rcraynon@contractor.usgs.gov', 'Attachment example', 'test', {
//    name: 'Automatic Emailer Script',
//      attachments:[Utilities.newBlob(elt, 'application/json', table+'.json')]});

  return elt;

}
function getData(commodity,year,type)

{
  if (type=='m'){
   var conn = Jdbc.getConnection(dbUrl, user, userPwd);
 var start = new Date();
  var stmt_struct = conn.prepareStatement("SELECT filter_commodity, filter_group,\
  STRCMP(filter_type1,'')+ STRCMP(filter_type2,'') as num_types ,filter_type1,STRCMP(filter_type1,'')+ STRCMP(filter_type2,'') as  num_types,filter_type1,filter_type2,\
  STRCMP(filter_phase1,'')+ STRCMP(filter_phase2,'') as num_phases,filter_phase1,STRCMP(filter_phase1,'')+ STRCMP(filter_phase2,'') as num_phases,filter_phase1,filter_phase2,\
  STRCMP(filter_measure1,'')+ STRCMP(filter_measure2,'') as num_measures,filter_measure1,STRCMP(filter_measure1,'')+ STRCMP(filter_measure2,'') as num_measures,filter_measure1,filter_measure2,\
  STRCMP(filter_form1,'')+ STRCMP(filter_form2,'') as num_forms,filter_form1,STRCMP(filter_form1,'')+ STRCMP(filter_form2,'') as num_forms,filter_form1,filter_form2,\
  STRCMP(filter_exclude1,'')+ STRCMP(filter_exclude2,'') as num_exclude,filter_exclude1,STRCMP(filter_exclude1,'')+ STRCMP(filter_exclude2,'') as num_exclude,filter_exclude1,filter_exclude2,\
  STRCMP(filter_subform1,'')+ STRCMP(filter_subform2,'') as num_forms,filter_subform1,STRCMP(filter_subform1,'')+ STRCMP(filter_subform2,'') as num_forms,filter_subform1,filter_subform2,\
  STRCMP(filter_excludesubform,'') as num_subexclude,filter_excludesubform\
  FROM ONEWORLD.STRUCT_V1 WHERE \
  UPPER(commodity)=UPPER(?)");
  stmt_struct.setString(1, commodity);
   var result_struct = stmt_struct.executeQuery();
     var num_cols_struct = result_struct.getMetaData().getColumnCount();

 var stmt = conn.prepareStatement("SELECT year1.key, year1.country,year1.commodity,year1.type,year1.phase,year1.measure_production,\
                                  year1.measure_content,year1.form,year1.subform,year1.unit,\
  year1.Commodity_Description, year1.Country_Description,\
 replace(year1.v1_value_prelim,',','') as year1_v1_value_prelim,\
 year1.v1_e_prelim as year1_v1_e_prelim,\
 year1.v1_source_prelim as year1_v1_source_prelim,\
 replace(year1.v3_value_prelim,',','') as year1_v3_value_prelim,\
 year1.v3_e_prelim as year1_v3_e_prelim,\
 year1.v3_source_prelim as year1_v3_source_prelim,\
replace(year1.current_value,',','') as year1_current_value,\
 year1.current_e as year1_current_e,\
 year1.current_source as year1_current_source,\
 replace(year1.v1_prior_value,',','') as year1_v1_prior_value,\
replace(year1.v3_prior_value,',','') as year1_v3_prior_value,\
 year1.v1_footnote_1 as year1_v1_footnote_1,\
 year1.v1_footnote_2 as year1_v1_footnote_2,\
 year1.v3_footnote_1 as year1_v3_footnote_1,\
 year1.v3_footnote_2 as year1_v3_footnote_2,\
year1.key_year as key_year1,year1.status as year1_status,\
 replace(year2.v1_value_prelim,',','') as year2_v1_value_prelim,\
 year2.v1_e_prelim as year2_v1_e_prelim,\
 year2.v1_source_prelim as year2_v1_source_prelim,\
 replace(year2.v3_value_prelim,',','') as year2_v3_value_prelim,\
 year2.v3_e_prelim as year2_v3_e_prelim,\
 year2.v3_source_prelim as year2_v3_source_prelim,\
replace(year2.current_value,',','') as year2_current_value,\
 year2.current_e as year2_current_e,\
 year2.current_source as year2_current_source,\
 replace(year2.v1_prior_value,',','') as year2_v1_prior_value,\
replace(year2.v3_prior_value,',','') as year2_v3_prior_value,\
 year2.v1_footnote_1 as year2_v1_footnote_1,\
 year2.v1_footnote_2 as year2_v1_footnote_2,\
 year2.v3_footnote_1 as year2_v3_footnote_1,\
 year2.v3_footnote_2 as year2_v3_footnote_2,\
year2.key_year as key_year2,year2.status as year2_status,\
 replace(year3.v1_value_prelim,',','') as year3_v1_value_prelim,\
 year3.v1_e_prelim as year3_v1_e_prelim,\
 year3.v1_source_prelim as year3_v1_source_prelim,\
 replace(year3.v3_value_prelim,',','') as year3_v3_value_prelim,\
 year3.v3_e_prelim as year3_v3_e_prelim,\
 year3.v3_source_prelim as year3_v3_source_prelim,\
replace(year3.current_value,',','') as year3_current_value,\
 year3.current_e as year3_current_e,\
 year3.current_source as year3_current_source,\
 replace(year3.v1_prior_value,',','') as year3_v1_prior_value,\
replace(year3.v3_prior_value,',','') as year3_v3_prior_value,\
 year3.v1_footnote_1 as year3_v1_footnote_1,\
 year3.v1_footnote_2 as year3_v1_footnote_2,\
 year3.v3_footnote_1 as year3_v3_footnote_1,\
 year3.v3_footnote_2 as year3_v3_footnote_2,\
year3.key_year as key_year3,year3.status as year3_status,\
 replace(year4.v1_value_prelim,',','') as year4_v1_value_prelim,\
 year4.v1_e_prelim as year4_v1_e_prelim,\
 year4.v1_source_prelim as year4_v1_source_prelim,\
 replace(year4.v3_value_prelim,',','') as year4_v3_value_prelim,\
 year4.v3_e_prelim as year4_v3_e_prelim,\
 year4.v3_source_prelim as year4_v3_source_prelim,\
replace(year4.current_value,',','') as year4_current_value,\
 year4.current_e as year4_current_e,\
 year4.current_source as year4_current_source,\
 replace(year4.v1_prior_value,',','') as year4_v1_prior_value,\
replace(year4.v3_prior_value,',','') as year4_v3_prior_value,\
 year4.v1_footnote_1 as year4_v1_footnote_1,\
 year4.v1_footnote_2 as year4_v1_footnote_2,\
 year4.v3_footnote_1 as year4_v3_footnote_1,\
 year4.v3_footnote_2 as year4_v3_footnote_2,\
year4.key_year as key_year4,year4.status as year4_status,\
 replace(year5.v1_value_prelim,',','') as year5_v1_value_prelim,\
 year5.v1_e_prelim as year5_v1_e_prelim,\
 year5.v1_source_prelim as year5_v1_source_prelim,\
 replace(year5.v3_value_prelim,',','') as year5_v3_value_prelim,\
 year5.v3_e_prelim as year5_v3_e_prelim,\
 year5.v3_source_prelim as year5_v3_source_prelim,\
replace(year5.current_value,',','') as year5_current_value,\
 year5.current_e as year5_current_e,\
 year5.current_source as year5_current_source,\
 replace(year5.v1_prior_value,',','') as year5_v1_prior_value,\
replace(year5.v3_prior_value,',','') as year5_v3_prior_value,\
 year5.v1_footnote_1 as year5_v1_footnote_1,\
 year5.v1_footnote_2 as year5_v1_footnote_2,\
 year5.v3_footnote_1 as year5_v3_footnote_1,\
 year5.v3_footnote_2 as year5_v3_footnote_2,\
year5.key_year as key_year5,year5.status as year5_status\
  FROM PRODUCTION_DATA as year1 \
  left join PRODUCTION_DATA as year2 on year1.key=year2.key\
  left join PRODUCTION_DATA as year3 on year2.key=year3.key\
  left join PRODUCTION_DATA as year4 on year3.key=year4.key\
  left join PRODUCTION_DATA as year5 on year4.key=year5.key\
        where year1.year="+(year-4)+" AND year2.year="+(year-3)+" AND year3.year="+(year-2)+" AND year4.year="+(year-1)+" AND year5.year="+(year-0)+"\
  AND (UPPER(year1.commodity)=UPPER(?) or (UPPER(year1.commodity_group)=UPPER(?)and UPPER(year1.commodity_group)!=UPPER('')))AND \
  if(?=1,(UPPER(year1.type)=UPPER(?)),if(?=2,(UPPER(year1.type)=UPPER(?) or UPPER(year1.type)=UPPER(?)),true)) AND\
  if(?=1,(UPPER(year1.phase)=UPPER(?)),if(?=2,(UPPER(year1.phase)=UPPER(?) or UPPER(year1.phase)=UPPER(?)),true)) AND\
  if(?=1,(UPPER(year1.measure_production)=UPPER(?)),if(?=2,(UPPER(year1.measure_production)=UPPER(?) or UPPER(year1.measure_production)=UPPER(?)),true)) AND\
  if(?=1,(UPPER(year1.form)=UPPER(?)), if(?=2,(UPPER(year1.form)=UPPER(?) or UPPER(year1.form)=UPPER(?)),true)) AND\
  if(?=1,(UPPER(year1.form)!=UPPER(?)), if(?=2,(UPPER(year1.form)!=UPPER(?) AND UPPER(year1.form)!=UPPER(?)),true)) AND \
  if(?=1,(UPPER(year1.subform)=UPPER(?)), if(?=2,(UPPER(year1.subform)=UPPER(?) or UPPER(year1.subform)=UPPER(?)),true)) AND\
  if(?=1,(UPPER(year1.subform)!=UPPER(?)),true)                                ORDER BY country")
  var i;
  for(i = 1, result_struct.next();i<=num_cols_struct;++i){
     stmt.setString(i, result_struct.getString(i));

  }

 stmt.setMaxRows(1000);
 var rows = []

 var result = stmt.executeQuery();
  
 var numCols = result.getMetaData().getColumnCount();


  if  (result.next()){

 do
 {
  
       var key = result.getString('key');
console.log(key)
      var stmt_terms = conn.prepareStatement("SELECT  v1_footnote_1, v1_footnote_2, v3_footnote_1, v3_footnote_2, industry_classifier, reconcile, commodity_group from  ONEWORLD.PRODUCTION_TERMS where `key`=?")
         stmt_terms.setString(1,key);       
   var result_terms = stmt_terms.executeQuery();
  var FOOTNOTE_VOLUME_1A;
    var FOOTNOTE_VOLUME_1B;
  var FOOTNOTE_VOLUME_3A;
  var FOOTNOTE_VOLUME_3B;
  var industry;
  var confirm;
  var commodity_group;
  if(result_terms.first()){

   FOOTNOTE_VOLUME_1A=result_terms.getString('v1_footnote_1');
   FOOTNOTE_VOLUME_1B=result_terms.getString('v1_footnote_2');
   FOOTNOTE_VOLUME_3A=result_terms.getString('v3_footnote_1');
   FOOTNOTE_VOLUME_3B=result_terms.getString('v3_footnote_2');
   industry=result_terms.getString('industry_classifier');
   confirm=result_terms.getString('reconcile');
   commodity_group=result_terms.getString('commodity_group')
 }
 rows.push(new Row(
   result.getString('country'),result.getString('commodity'),result.getString('type'), result.getString('phase'),
           result.getString('measure_production'),result.getString('measure_content'),result.getString('form'),
           result.getString('subform'),result.getString('unit'),'',result.getString('Commodity_Description'), result.getString('Country_Description'),'',
          
           result.getString('year1_v1_value_prelim'), result.getString('year1_v1_e_prelim'),  result.getString('year1_v1_source_prelim'), 
           result.getString('year1_v3_value_prelim'), result.getString('year1_v3_e_prelim'),  result.getString('year1_v3_source_prelim'),
           result.getString('year1_current_value'), result.getString('year1_current_e'),  result.getString('year1_current_source'),
           result.getString('year1_v1_prior_value'), result.getString('year1_v3_prior_value'),  
           result.getString('year1_v1_footnote_1'),result.getString('year1_v1_footnote_2'),
           
   result.getString('year1_current_value'),
   
             result.getString('year2_v1_value_prelim'), result.getString('year2_v1_e_prelim'),  result.getString('year2_v1_source_prelim'), 
           result.getString('year2_v3_value_prelim'), result.getString('year2_v3_e_prelim'),  result.getString('year2_v3_source_prelim'),
           result.getString('year2_current_value'), result.getString('year2_current_e'),  result.getString('year2_current_source'),
           result.getString('year2_v1_prior_value'), result.getString('year2_v3_prior_value'),  
           result.getString('year2_v1_footnote_1'),result.getString('year2_v1_footnote_2'),
                     
   result.getString('year2_current_value'),
   
             result.getString('year3_v1_value_prelim'), result.getString('year3_v1_e_prelim'),  result.getString('year3_v1_source_prelim'), 
           result.getString('year3_v3_value_prelim'), result.getString('year3_v3_e_prelim'),  result.getString('year3_v3_source_prelim'),
           result.getString('year3_current_value'), result.getString('year3_current_e'),  result.getString('year3_current_source'),
           result.getString('year3_v1_prior_value'), result.getString('year3_v3_prior_value'),  
           result.getString('year3_v1_footnote_1'),result.getString('year3_v1_footnote_2'),
                     
   result.getString('year3_current_value'),
   
             result.getString('year4_v1_value_prelim'), result.getString('year4_v1_e_prelim'),  result.getString('year4_v1_source_prelim'), 
           result.getString('year4_v3_value_prelim'), result.getString('year4_v3_e_prelim'),  result.getString('year4_v3_source_prelim'),
           result.getString('year4_current_value'), result.getString('year4_current_e'),  result.getString('year4_current_source'),
           result.getString('year4_v1_prior_value'), result.getString('year4_v3_prior_value'),  
           result.getString('year4_v1_footnote_1'),result.getString('year4_v1_footnote_2'),
                     
   result.getString('year4_current_value'),
   
                     result.getString('year5_v1_value_prelim'), result.getString('year5_v1_e_prelim'),  result.getString('year5_v1_source_prelim'), 
           result.getString('year5_v3_value_prelim'), result.getString('year5_v3_e_prelim'),  result.getString('year5_v3_source_prelim'),
           result.getString('year5_current_value'), result.getString('year5_current_e'),  result.getString('year5_current_source'),
           result.getString('year5_v1_prior_value'), result.getString('year5_v3_prior_value'),  
           result.getString('year5_v1_footnote_1'),result.getString('year5_v1_footnote_2') ,
           
   result.getString('year5_current_value'),
   result.getString('key'),
   
     FOOTNOTE_VOLUME_1A,
     FOOTNOTE_VOLUME_1B,
   FOOTNOTE_VOLUME_3A,
   FOOTNOTE_VOLUME_3B,
   industry,
   confirm,
   commodity_group,
    result.getString('key_year1'),
   result.getString('key_year2'),
   result.getString('key_year3'),
   result.getString('key_year4'),
   result.getString('key_year5'),
   result.getString('year1_status'),
   result.getString('year2_status'),
   result.getString('year3_status'),
   result.getString('year4_status'),
   result.getString('year5_status'),''

   ));
 }
  while (result.next()) 
    }
 // Logger.log(rows)

  return rows;
  
  }
    if (type=='g'){
     var conn = Jdbc.getConnection(dbUrl, user, userPwd);
    var start = new Date();
    var stmt = conn.prepareStatement("SELECT year1.key, year1.country,year1.commodity,year1.type,year1.phase,year1.measure_production,\
        year1.measure_content,year1.form,year1.subform,year1.unit,year1.unit_short,year1.supress,\
        year1.Commodity_Description, year1.Country_Description, year1.multiplier,\
        replace(year1.v1_value_prelim,',','') as year1_v1_value_prelim,\
        year1.v1_e_prelim as year1_v1_e_prelim,\
        year1.v1_source_prelim as year1_v1_source_prelim,\
        replace(year1.v3_value_prelim,',','') as year1_v3_value_prelim,\
        year1.v3_e_prelim as year1_v3_e_prelim,\
        year1.v3_source_prelim as year1_v3_source_prelim,\
        replace(year1.current_value,',','') as year1_current_value,\
        year1.current_e as year1_current_e,\
        year1.current_source as year1_current_source,\
        replace(year1.v1_prior_value,',','') as year1_v1_prior_value,\
        replace(year1.v3_prior_value,',','') as year1_v3_prior_value,\
        year1.v1_footnote_1 as year1_v1_footnote_1,\
        year1.v1_footnote_2 as year1_v1_footnote_2,\
        year1.v3_footnote_1 as year1_v3_footnote_1,\
        year1.v3_footnote_2 as year1_v3_footnote_2,\
        year1.key_year as key_year1,year1.status as year1_status,\
        replace(year2.v1_value_prelim,',','') as year2_v1_value_prelim,\
        year2.v1_e_prelim as year2_v1_e_prelim,\
        year2.v1_source_prelim as year2_v1_source_prelim,\
        replace(year2.v3_value_prelim,',','') as year2_v3_value_prelim,\
        year2.v3_e_prelim as year2_v3_e_prelim,\
        year2.v3_source_prelim as year2_v3_source_prelim,\
        replace(year2.current_value,',','') as year2_current_value,\
        year2.current_e as year2_current_e,\
        year2.current_source as year2_current_source,\
        replace(year2.v1_prior_value,',','') as year2_v1_prior_value,\
        replace(year2.v3_prior_value,',','') as year2_v3_prior_value,\
        year2.v1_footnote_1 as year2_v1_footnote_1,\
        year2.v1_footnote_2 as year2_v1_footnote_2,\
        year2.v3_footnote_1 as year2_v3_footnote_1,\
        year2.v3_footnote_2 as year2_v3_footnote_2,\
        year2.key_year as key_year2,year2.status as year2_status,\
        replace(year3.v1_value_prelim,',','') as year3_v1_value_prelim,\
        year3.v1_e_prelim as year3_v1_e_prelim,\
        year3.v1_source_prelim as year3_v1_source_prelim,\
        replace(year3.v3_value_prelim,',','') as year3_v3_value_prelim,\
        year3.v3_e_prelim as year3_v3_e_prelim,\
        year3.v3_source_prelim as year3_v3_source_prelim,\
        replace(year3.current_value,',','') as year3_current_value,\
        year3.current_e as year3_current_e,\
        year3.current_source as year3_current_source,\
        replace(year3.v1_prior_value,',','') as year3_v1_prior_value,\
        replace(year3.v3_prior_value,',','') as year3_v3_prior_value,\
        year3.v1_footnote_1 as year3_v1_footnote_1,\
        year3.v1_footnote_2 as year3_v1_footnote_2,\
        year3.v3_footnote_1 as year3_v3_footnote_1,\
        year3.v3_footnote_2 as year3_v3_footnote_2,\
        year3.key_year as key_year3,year3.status as year3_status,\
        replace(year4.v1_value_prelim,',','') as year4_v1_value_prelim,\
        year4.v1_e_prelim as year4_v1_e_prelim,\
        year4.v1_source_prelim as year4_v1_source_prelim,\
        replace(year4.v3_value_prelim,',','') as year4_v3_value_prelim,\
        year4.v3_e_prelim as year4_v3_e_prelim,\
        year4.v3_source_prelim as year4_v3_source_prelim,\
        replace(year4.current_value,',','') as year4_current_value,\
        year4.current_e as year4_current_e,\
        year4.current_source as year4_current_source,\
        replace(year4.v1_prior_value,',','') as year4_v1_prior_value,\
        replace(year4.v3_prior_value,',','') as year4_v3_prior_value,\
        year4.v1_footnote_1 as year4_v1_footnote_1,\
        year4.v1_footnote_2 as year4_v1_footnote_2,\
        year4.v3_footnote_1 as year4_v3_footnote_1,\
        year4.v3_footnote_2 as year4_v3_footnote_2,\
        year4.key_year as key_year4,year4.status as year4_status,\
        replace(year5.v1_value_prelim,',','') as year5_v1_value_prelim,\
        year5.v1_e_prelim as year5_v1_e_prelim,\
        year5.v1_source_prelim as year5_v1_source_prelim,\
        replace(year5.v3_value_prelim,',','') as year5_v3_value_prelim,\
        year5.v3_e_prelim as year5_v3_e_prelim,\
        year5.v3_source_prelim as year5_v3_source_prelim,\
        replace(year5.current_value,',','') as year5_current_value,\
        year5.current_e as year5_current_e,\
        year5.current_source as year5_current_source,\
        replace(year5.v1_prior_value,',','') as year5_v1_prior_value,\
        replace(year5.v3_prior_value,',','') as year5_v3_prior_value,\
        year5.v1_footnote_1 as year5_v1_footnote_1,\
        year5.v1_footnote_2 as year5_v1_footnote_2,\
        year5.v3_footnote_1 as year5_v3_footnote_1,\
        year5.v3_footnote_2 as year5_v3_footnote_2,\
        year5.key_year as key_year5,year5.status as year5_status\
        FROM PRODUCTION_DATA as year1 \
        left join PRODUCTION_DATA as year2 on year1.key=year2.key\
        left join PRODUCTION_DATA as year3 on year2.key=year3.key\
        left join PRODUCTION_DATA as year4 on year3.key=year4.key\
        left join PRODUCTION_DATA as year5 on year4.key=year5.key\
        where year1.year="+(year-4)+" AND year2.year="+(year-3)+" AND year3.year="+(year-2)+" AND year4.year="+(year-1)+" AND year5.year="+(year-0)+"\
        AND (UPPER(year1.country)=UPPER(?) or UPPER(year1.country_group)=UPPER(?)) ORDER BY country ")
stmt.setString(1, commodity);

stmt.setString(2, commodity);

stmt.setMaxRows(1000);
var rows = []

var result = stmt.executeQuery();

var numCols = result.getMetaData().getColumnCount();


if  (result.next()){

    do
    {

        var key = result.getString('key');
        console.log(key)
        var stmt_terms = conn.prepareStatement("SELECT  v1_footnote_1, v1_footnote_2, v3_footnote_1, v3_footnote_2, industry_classifier, reconcile, commodity_group from  ONEWORLD.PRODUCTION_TERMS where `key`=?")
        stmt_terms.setString(1,key);       
        var result_terms = stmt_terms.executeQuery();
        var FOOTNOTE_VOLUME_1A;
        var FOOTNOTE_VOLUME_1B;
        var FOOTNOTE_VOLUME_3A;
        var FOOTNOTE_VOLUME_3B;
        var industry;
        var confirm;
        var commodity_group;
        if(result_terms.first()){

            FOOTNOTE_VOLUME_1A=result_terms.getString('v1_footnote_1');
            FOOTNOTE_VOLUME_1B=result_terms.getString('v1_footnote_2');
            FOOTNOTE_VOLUME_3A=result_terms.getString('v3_footnote_1');
            FOOTNOTE_VOLUME_3B=result_terms.getString('v3_footnote_2');
            industry=result_terms.getString('industry_classifier');
            confirm=result_terms.getString('reconcile');
            commodity_group=result_terms.getString('commodity_group')
        }
        rows.push(new Row(
            result.getString('country'),result.getString('commodity'),result.getString('type'), result.getString('phase'),
            result.getString('measure_production'),result.getString('measure_content'),result.getString('form'),
            result.getString('subform'),result.getString('unit'),result.getString('unit_short'),result.getString('Commodity_Description'), result.getString('Country_Description'), result.getString('multiplier'),

            result.getString('year1_v1_value_prelim'), result.getString('year1_v1_e_prelim'),  result.getString('year1_v1_source_prelim'), 
            result.getString('year1_v3_value_prelim'), result.getString('year1_v3_e_prelim'),  result.getString('year1_v3_source_prelim'),
            result.getString('year1_current_value'), result.getString('year1_current_e'),  result.getString('year1_current_source'),
            result.getString('year1_v1_prior_value'), result.getString('year1_v3_prior_value'),  
            result.getString('year1_v3_footnote_1'),result.getString('year1_v3_footnote_2'),

            result.getString('year1_current_value'),

            result.getString('year2_v1_value_prelim'), result.getString('year2_v1_e_prelim'),  result.getString('year2_v1_source_prelim'), 
            result.getString('year2_v3_value_prelim'), result.getString('year2_v3_e_prelim'),  result.getString('year2_v3_source_prelim'),
            result.getString('year2_current_value'), result.getString('year2_current_e'),  result.getString('year2_current_source'),
            result.getString('year2_v1_prior_value'), result.getString('year2_v3_prior_value'),  
            result.getString('year2_v3_footnote_1'),result.getString('year2_v3_footnote_2'),

            result.getString('year2_current_value'),

            result.getString('year3_v1_value_prelim'), result.getString('year3_v1_e_prelim'),  result.getString('year3_v1_source_prelim'), 
            result.getString('year3_v3_value_prelim'), result.getString('year3_v3_e_prelim'),  result.getString('year3_v3_source_prelim'),
            result.getString('year3_current_value'), result.getString('year3_current_e'),  result.getString('year3_current_source'),
            result.getString('year3_v1_prior_value'), result.getString('year3_v3_prior_value'),  
            result.getString('year3_v3_footnote_1'),result.getString('year3_v3_footnote_2'),

            result.getString('year3_current_value'),

            result.getString('year4_v1_value_prelim'), result.getString('year4_v1_e_prelim'),  result.getString('year4_v1_source_prelim'), 
            result.getString('year4_v3_value_prelim'), result.getString('year4_v3_e_prelim'),  result.getString('year4_v3_source_prelim'),
            result.getString('year4_current_value'), result.getString('year4_current_e'),  result.getString('year4_current_source'),
            result.getString('year4_v1_prior_value'), result.getString('year4_v3_prior_value'),  
            result.getString('year4_v3_footnote_1'),result.getString('year4_v3_footnote_2'),

            result.getString('year4_current_value'),

            result.getString('year5_v1_value_prelim'), result.getString('year5_v1_e_prelim'),  result.getString('year5_v1_source_prelim'), 
            result.getString('year5_v3_value_prelim'), result.getString('year5_v3_e_prelim'),  result.getString('year5_v3_source_prelim'),
            result.getString('year5_current_value'), result.getString('year5_current_e'),  result.getString('year5_current_source'),
            result.getString('year5_v1_prior_value'), result.getString('year5_v3_prior_value'),  
            result.getString('year5_v3_footnote_1'),result.getString('year5_v3_footnote_2') ,

            result.getString('year5_current_value'),
            result.getString('key'),

            FOOTNOTE_VOLUME_1A,
            FOOTNOTE_VOLUME_1B,
            FOOTNOTE_VOLUME_3A,
            FOOTNOTE_VOLUME_3B,
            industry,
            confirm,
            commodity_group,
            result.getString('key_year1'),
            result.getString('key_year2'),
            result.getString('key_year3'),
            result.getString('key_year4'),
            result.getString('key_year5'),
            result.getString('year1_status'),
            result.getString('year2_status'),
            result.getString('year3_status'),
            result.getString('year4_status'),
            result.getString('year5_status'),
          result.getString('supress')
            ));
    }
while (result.next()) 
}
// Logger.log(rows)

return rows;

    }
}
function dailyCleanup(){
  	var conn = Jdbc.getConnection(dbUrl, user, userPwd);
  var stmt_clear=[]
   stmt_clear.push(conn.prepareStatement("UPDATE ONEWORLD.PRODUCTION_DATA SET status='', v1_expires='', v1_value_prelim='',v1_e_prelim='',v1_source_prelim='',v3_value_prelim='',v3_e_prelim='',v3_source_prelim='' where status='AGREED'"));
 stmt_clear.push(conn.prepareStatement("UPDATE ONEWORLD.PRODUCTION_DATA \
SET current_value=v1_value_prelim,current_e=v1_e_prelim,current_source=v1_source_prelim \
where status = 'DONE1'"));
stmt_clear.push(conn.prepareStatement("UPDATE ONEWORLD.PRODUCTION_DATA \
SET current_value=v3_value_prelim,current_e=v3_e_prelim,current_source=v3_source_prelim \
where status = 'DONE3'"));
stmt_clear.push(conn.prepareStatement("UPDATE ONEWORLD.PRODUCTION_DATA \
SET status='', v1_expires='', v1_value_prelim='',v1_e_prelim='',v1_source_prelim='' \
where status='UPDATE1' or status='NEW1' or status='DONE1'"));

stmt_clear.push(conn.prepareStatement("UPDATE ONEWORLD.PRODUCTION_DATA \
SET status='', v1_expires='',v3_value_prelim='',v3_e_prelim='',v3_source_prelim='' \
where status='UPDATE3' OR status='NEW3' or status='DONE3'"));
  
stmt_clear.push(conn.prepareStatement("UPDATE ONEWORLD.PRODUCTION_DATA \
SET v1_expires=''\
where status=''"));
  for (i=0; i<stmt_clear.length;i=i+1){
  stmt_clear[i].executeUpdate()
  }
}
function backup(){
  
}
function expiredElevate(){
  
}

function expiredAutoagree(){
  var conn = Jdbc.getConnection(dbUrl, user, userPwd);
  var list = []
  var stmt_chk1 = conn.prepareStatement("SELECT \
    * \
FROM \
    ONEWORLD.PRODUCTION_DATA \
WHERE \
    v1_expires != '' \
        AND STR_TO_DATE(SUBSTR(v1_expires, 1, 15), \
            '%a %b %d %Y ') < CURRENT_DATE() \
        AND STATUS LIKE '%GLOBAL%'");
   var result = stmt_chk1.executeQuery();
  while(result.next()){
    list.push({key:(result.getString('key_year')),country:(result.getString('country')),commodity:(result.getString('commodity')),message:'expired, autoagreed with global'})
    
  }
  
    var stmt_chk2 = conn.prepareStatement("SELECT \
    * \
FROM \
    ONEWORLD.PRODUCTION_DATA \
WHERE \
    v1_expires != '' \
        AND STR_TO_DATE(SUBSTR(v1_expires, 1, 15), \
            '%a %b %d %Y ') < CURRENT_DATE() \
        AND STATUS LIKE '%MINERAL%'");
   var result = stmt_chk2.executeQuery();
  while(result.next()){
    list.push({key:(result.getString('key_year')),country:(result.getString('country')),commodity:(result.getString('commodity')),message:'expired, autoagreed with global'})
    
  }
  for(i=0;i<list.length;i=i+1){
  var stmt_history=conn.prepareStatement("INSERT into HISTORY(key_year,changes,new_value,user,estimated,source,country,commodity) values (?,?,?,?,?,?,?,?)");

   MailApp.sendEmail({to:"nmicsystems@usgs.gov",
                     replyTo:"nmicsystems@usgs.gov",
                name:"OneWorld System",
                subject:"🌏 OneWorld Expirations",
                     htmlBody:"The item:"+list[i].key+" has expired." });
    
    
        stmt_history.setString(1,list[i].key)
        stmt_history.setString(2, list[i].message)
stmt_history.setString(3,'expired')
stmt_history.setString(4, 'expired')
stmt_history.setString(5, 'expired')
stmt_history.setString(6, 'expired')
stmt_history.setString(7, list[i].country)
stmt_history.setString(8, list[i].commodity)
stmt_history.executeUpdate();
    
    
  }
  
  var stmt_auto1 = conn.prepareStatement("update ONEWORLD.PRODUCTION_DATA set v1_expires='',current_value=v1_value_prelim,current_e=v1_e_prelim,current_source=v1_source_prelim,STATUS='AGREED' where  v1_expires!='' and STR_TO_DATE(substr(v1_expires,1,15),'%a %b %d %Y ')< current_date() and  STATUS like '%GLOBAL%'");
var stmt_auto2 = conn.prepareStatement("update ONEWORLD.PRODUCTION_DATA set v1_expires='',current_value=v3_value_prelim,current_e=v3_e_prelim,current_source=v3_source_prelim,STATUS='AGREED' where  v1_expires!='' and STR_TO_DATE(substr(v1_expires,1,15),'%a %b %d %Y ')< current_date() and  STATUS like '%MINERAL%'")
stmt_auto1.execute();
  stmt_auto2.execute();

}
function testEmail(){
 sendFinishedEmail('Test','rcraynon@usgs.gov',false) 
}
function sendFinishedEmail(table,specialist,IDA,elt){
  var ida_emails=['pneely@usgs.gov', 'shakim@usgs.gov', 'lbarnes@usgs.gov', 'sosborne@usgs.gov']
  var recipients=['nmicsystems@usgs.gov']
 // recipients.push(specialist)
  if(IDA){
    recipients=recipients.concat(ida_emails)
  }
  recipients=recipients.join(',');

  MailApp.sendEmail({to:recipients,
                     replyTo:"nmicsystems@usgs.gov",
                name:"OneWorld System",
                     subject:"🌏 OneWorld: "+table+"(IDA)",
                     htmlBody:"The Table:"+table+" is ready to be generated. This email is sent as a notification for IDA only" ,
                     attachments:[Utilities.newBlob(elt, 'application/json', table+'.json')]});

  
}