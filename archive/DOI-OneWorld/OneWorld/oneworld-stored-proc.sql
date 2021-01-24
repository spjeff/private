DELIMITER //

CREATE PROCEDURE sp_get_production_data(IN param_commodity VARCHAR(100), IN param_year VARCHAR(100))
BEGIN

DECLARE year, year1, year2, year3, year4 VARCHAR(255);
SET @year = CAST(param_year AS UNSIGNED);
SET @year1 = CAST(param_year AS UNSIGNED) -1;
SET @year2 = CAST(param_year AS UNSIGNED) -2;
SET @year3 = CAST(param_year AS UNSIGNED) -3;
SET @year4 = CAST(param_year AS UNSIGNED) -4;


DROP TEMPORARY TABLE tempCommodity;

CREATE TEMPORARY TABLE IF NOT EXISTS tempCommodity AS (
SELECT filter_commodity, filter_group,
  STRCMP(filter_type1,'')+ STRCMP(filter_type2,'') as num_types ,filter_type1,STRCMP(filter_type1,'')+ STRCMP(filter_type2,'') as  filter_type2,
  
  STRCMP(filter_phase1,'')+ STRCMP(filter_phase2,'') as num_phases,filter_phase1,STRCMP(filter_phase1,'')+ STRCMP(filter_phase2,'') as filter_phase2,
  STRCMP(filter_measure1,'')+ STRCMP(filter_measure2,'') as num_measures,filter_measure1,STRCMP(filter_measure1,'')+ STRCMP(filter_measure2,'') as filter_measure2,
  STRCMP(filter_form1,'')+ STRCMP(filter_form2,'') as num_forms,filter_form1,STRCMP(filter_form1,'')+ STRCMP(filter_form2,'') as filter_form2,
  STRCMP(filter_exclude1,'')+ STRCMP(filter_exclude2,'') as num_exclude,filter_exclude1,STRCMP(filter_exclude1,'')+ STRCMP(filter_exclude2,'') as filter_exclude2,
  STRCMP(filter_subform1,'')+ STRCMP(filter_subform2,'') as num_forms2,filter_subform1,STRCMP(filter_subform1,'')+ STRCMP(filter_subform2,'') as filter_subform2,
  STRCMP(filter_excludesubform,'') as num_subexclude,filter_excludesubform
  FROM ONEWORLD.STRUCT_V1 WHERE 
  UPPER(commodity)=UPPER(param_commodity)
);

SET @a = (SELECT filter_commodity FROM tempCommodity);
SET @b = (SELECT filter_group FROM tempCommodity);
SET @c = (SELECT num_types FROM tempCommodity);
SET @d = (SELECT filter_type1 FROM tempCommodity);
SET @e = (SELECT filter_type2 FROM tempCommodity);
SET @f = (SELECT num_phases FROM tempCommodity);
SET @g = (SELECT filter_phase1 FROM tempCommodity);
SET @h = (SELECT filter_phase2 FROM tempCommodity);
SET @i = (SELECT num_measures FROM tempCommodity);
SET @j = (SELECT filter_measure1 FROM tempCommodity);
SET @k = (SELECT filter_measure2 FROM tempCommodity);
SET @l = (SELECT num_forms FROM tempCommodity);
SET @m = (SELECT filter_form1 FROM tempCommodity);
SET @n = (SELECT filter_form2 FROM tempCommodity);
SET @o = (SELECT num_exclude FROM tempCommodity);
SET @p = (SELECT filter_exclude1 FROM tempCommodity);
SET @q = (SELECT filter_exclude2 FROM tempCommodity);
SET @r = (SELECT num_forms2 FROM tempCommodity);
SET @s = (SELECT filter_subform1 FROM tempCommodity);
SET @t = (SELECT filter_subform2 FROM tempCommodity);
SET @u = (SELECT num_subexclude FROM tempCommodity);
SET @v = (SELECT filter_excludesubform FROM tempCommodity);


SELECT year1.key, year1.country,year1.commodity,year1.type,year1.phase,year1.measure_production, 
 year1.measure_content,year1.form,year1.subform,year1.unit, 
 year1.Commodity_Description, year1.Country_Description, 
 replace(year1.v1_value_prelim,',','') as year1_v1_value_prelim, 
 year1.v1_e_prelim as year1_v1_e_prelim, 
 year1.v1_source_prelim as year1_v1_source_prelim, 
 replace(year1.v3_value_prelim,',','') as year1_v3_value_prelim, 
 year1.v3_e_prelim as year1_v3_e_prelim, 
 year1.v3_source_prelim as year1_v3_source_prelim, 
replace(year1.current_value,',','') as year1_current_value, 
 year1.current_e as year1_current_e, 
 year1.current_source as year1_current_source, 
 replace(year1.v1_prior_value,',','') as year1_v1_prior_value, 
replace(year1.v3_prior_value,',','') as year1_v3_prior_value, 
 year1.v1_footnote_1 as year1_v1_footnote_1, 
 year1.v1_footnote_2 as year1_v1_footnote_2, 
 year1.v3_footnote_1 as year1_v3_footnote_1, 
 year1.v3_footnote_2 as year1_v3_footnote_2, 
year1.key_year as key_year1,year1.status as year1_status, 
 replace(year2.v1_value_prelim,',','') as year2_v1_value_prelim, 
 year2.v1_e_prelim as year2_v1_e_prelim, 
 year2.v1_source_prelim as year2_v1_source_prelim, 
 replace(year2.v3_value_prelim,',','') as year2_v3_value_prelim, 
 year2.v3_e_prelim as year2_v3_e_prelim, 
 year2.v3_source_prelim as year2_v3_source_prelim, 
replace(year2.current_value,',','') as year2_current_value, 
 year2.current_e as year2_current_e, 
 year2.current_source as year2_current_source, 
 replace(year2.v1_prior_value,',','') as year2_v1_prior_value, 
replace(year2.v3_prior_value,',','') as year2_v3_prior_value, 
 year2.v1_footnote_1 as year2_v1_footnote_1, 
 year2.v1_footnote_2 as year2_v1_footnote_2, 
 year2.v3_footnote_1 as year2_v3_footnote_1, 
 year2.v3_footnote_2 as year2_v3_footnote_2, 
year2.key_year as key_year2,year2.status as year2_status, 
 replace(year3.v1_value_prelim,',','') as year3_v1_value_prelim, 
 year3.v1_e_prelim as year3_v1_e_prelim, 
 year3.v1_source_prelim as year3_v1_source_prelim, 
 replace(year3.v3_value_prelim,',','') as year3_v3_value_prelim, 
 year3.v3_e_prelim as year3_v3_e_prelim, 
 year3.v3_source_prelim as year3_v3_source_prelim, 
replace(year3.current_value,',','') as year3_current_value, 
 year3.current_e as year3_current_e, 
 year3.current_source as year3_current_source, 
 replace(year3.v1_prior_value,',','') as year3_v1_prior_value, 
replace(year3.v3_prior_value,',','') as year3_v3_prior_value, 
 year3.v1_footnote_1 as year3_v1_footnote_1, 
 year3.v1_footnote_2 as year3_v1_footnote_2, 
 year3.v3_footnote_1 as year3_v3_footnote_1, 
 year3.v3_footnote_2 as year3_v3_footnote_2, 
year3.key_year as key_year3,year3.status as year3_status, 
 replace(year4.v1_value_prelim,',','') as year4_v1_value_prelim, 
 year4.v1_e_prelim as year4_v1_e_prelim, 
 year4.v1_source_prelim as year4_v1_source_prelim, 
 replace(year4.v3_value_prelim,',','') as year4_v3_value_prelim, 
 year4.v3_e_prelim as year4_v3_e_prelim, 
 year4.v3_source_prelim as year4_v3_source_prelim, 
replace(year4.current_value,',','') as year4_current_value, 
 year4.current_e as year4_current_e, 
 year4.current_source as year4_current_source, 
 replace(year4.v1_prior_value,',','') as year4_v1_prior_value, 
replace(year4.v3_prior_value,',','') as year4_v3_prior_value, 
 year4.v1_footnote_1 as year4_v1_footnote_1, 
 year4.v1_footnote_2 as year4_v1_footnote_2, 
 year4.v3_footnote_1 as year4_v3_footnote_1, 
 year4.v3_footnote_2 as year4_v3_footnote_2, 
year4.key_year as key_year4,year4.status as year4_status, 
 replace(year5.v1_value_prelim,',','') as year5_v1_value_prelim, 
 year5.v1_e_prelim as year5_v1_e_prelim, 
 year5.v1_source_prelim as year5_v1_source_prelim, 
 replace(year5.v3_value_prelim,',','') as year5_v3_value_prelim, 
 year5.v3_e_prelim as year5_v3_e_prelim, 
 year5.v3_source_prelim as year5_v3_source_prelim, 
replace(year5.current_value,',','') as year5_current_value, 
 year5.current_e as year5_current_e, 
 year5.current_source as year5_current_source, 
 replace(year5.v1_prior_value,',','') as year5_v1_prior_value, 
replace(year5.v3_prior_value,',','') as year5_v3_prior_value, 
 year5.v1_footnote_1 as year5_v1_footnote_1, 
 year5.v1_footnote_2 as year5_v1_footnote_2, 
 year5.v3_footnote_1 as year5_v3_footnote_1, 
 year5.v3_footnote_2 as year5_v3_footnote_2, 
year5.key_year as key_year5,year5.status as year5_status 
  FROM PRODUCTION_DATA as year1  
  left join PRODUCTION_DATA as year2 on year1.key=year2.key 
  left join PRODUCTION_DATA as year3 on year2.key=year3.key 
  left join PRODUCTION_DATA as year4 on year3.key=year4.key 
  left join PRODUCTION_DATA as year5 on year4.key=year5.key 
  where year1.year=@year4 AND year2.year=@year3 AND year3.year=@year2 AND year4.year=@year1 AND year5.year=@year 
 AND (UPPER(year1.commodity)=UPPER(@a) or (UPPER(year1.commodity_group)=UPPER(@b)and UPPER(year1.commodity_group)!=UPPER('')))AND 
  if(@c=1,(UPPER(year1.type)=UPPER(@d)),if(@c=2,(UPPER(year1.type)=UPPER(@d) or UPPER(year1.type)=UPPER(@e)),true)) AND
  if(@f=1,(UPPER(year1.phase)=UPPER(@g)),if(@f=2,(UPPER(year1.phase)=UPPER(@g) or UPPER(year1.phase)=UPPER(@h)),true)) AND
  if(@i=1,(UPPER(year1.measure_production)=UPPER(@j)),if(@i=2,(UPPER(year1.measure_production)=UPPER(@j) or UPPER(year1.measure_production)=UPPER(@k)),true)) AND
  if(@l=1,(UPPER(year1.form)=UPPER(@m)), if(@l=2,(UPPER(year1.form)=UPPER(@m) or UPPER(year1.form)=UPPER(@n)),true)) AND
  if(@o=1,(UPPER(year1.form)!=UPPER(@p)), if(@o=2,(UPPER(year1.form)!=UPPER(@p) AND UPPER(year1.form)!=UPPER(@q)),true)) AND 
  if(@r=1,(UPPER(year1.subform)=UPPER(@s)), if(@r=2,(UPPER(year1.subform)=UPPER(@s) or UPPER(year1.subform)=UPPER(@t)),true)) AND
  if(@u=1,(UPPER(year1.subform)!=UPPER(@v)),true)                                
  ORDER BY country;


END//

DELIMITER ;