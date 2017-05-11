-- 创建学生分数表
-- DROP TABLE IF EXISTS `t_scores`;
-- CREATE TABLE `t_scores` (
--   `s_id` int(11) NOT NULL auto_increatment,
--   `s_user_id` varchar(255) DEFAULT NULL,
--   `s_math` int(11) DEFAULT NULL,
--   `s_chinese` int(11) DEFAULT NULL,
--   `s_english` int(11) DEFAULT NULL,
--   `s_biology` int(11) DEFAULT NULL,
--   `s_chemistry` int(11) DEFAULT NULL,
--   `s_geography` int(11) DEFAULT NULL,
--   `s_phsics` int(11) DEFAULT NULL,
--   `s_history` int(11) DEFAULT NULL,
--   `s_politics` int(11) DEFAULT NULL,
--   `s_music` int(11) DEFAULT NULL,
--   `s_suport` int(11) DEFAULT NULL,
--   `s_art` int(11) DEFAULT NULL,
--   PRIMARY KEY (`s_id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO t_scores (s_user_id,s_math, s_chinese, s_english, s_biology, s_chemistry, s_geography, s_phsics, s_history, s_politics, s_music, s_suport, s_art)
													 VALUES ('1494207574365',80,80,80,80,80,80,80,80,80,80,80,80);

