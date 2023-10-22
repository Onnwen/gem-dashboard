-- MySQL dump 10.13  Distrib 8.0.33, for macos13.3 (x86_64)
--
-- Host: aws.connect.psdb.cloud    Database: gem
-- ------------------------------------------------------
-- Server version	8.0.23-PlanetScale

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '4782c746-2a12-11ee-838d-4a74ae63eed3:1-1573,
4782dd64-2a12-11ee-b888-baf4904c3800:1-48';

--
-- Table structure for table `elections`
--

DROP TABLE IF EXISTS `elections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nation_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `in_progress` tinyint(1) NOT NULL DEFAULT '1',
  `num_seats` int DEFAULT NULL,
  `source` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `elections`
--

LOCK TABLES `elections` WRITE;
/*!40000 ALTER TABLE `elections` DISABLE KEYS */;
INSERT INTO `elections` VALUES (1,1,'2016 Presidential Election','2016-11-08','2016-11-08',0,NULL,'Federal Election Commission USA'),(2,1,'2012 Presidential Election','2012-11-06','2012-11-06',0,NULL,'Federal Election Commission USA'),(3,1,'2008 Presidential Election','2008-11-04','2008-11-04',0,NULL,'Federal Election Commission USA');
/*!40000 ALTER TABLE `elections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nations`
--

DROP TABLE IF EXISTS `nations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `italian_name` varchar(100) DEFAULT NULL,
  `utf_icon` varchar(8) DEFAULT NULL,
  `elections_count` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nations`
--

LOCK TABLES `nations` WRITE;
/*!40000 ALTER TABLE `nations` DISABLE KEYS */;
INSERT INTO `nations` VALUES (1,'United States of America','Stati Uniti d\'America','🇺🇸',NULL);
/*!40000 ALTER TABLE `nations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parties`
--

DROP TABLE IF EXISTS `parties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `italian_name` varchar(100) DEFAULT NULL,
  `color` varchar(10) NOT NULL,
  `image_url` varchar(250) DEFAULT NULL,
  `description` text,
  `color_name` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parties`
--

LOCK TABLES `parties` WRITE;
/*!40000 ALTER TABLE `parties` DISABLE KEYS */;
INSERT INTO `parties` VALUES (1,'republican','Partito Repubblicano','E81B23',NULL,NULL,'blue'),(2,'democrat','Partito Democratico','00AEF3',NULL,NULL,'red'),(3,'other','Altri','808080',NULL,NULL,'neutral');
/*!40000 ALTER TABLE `parties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `party_elections`
--

DROP TABLE IF EXISTS `party_elections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `party_elections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `party_id` int NOT NULL,
  `election_id` int NOT NULL,
  `representative_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `party_elections`
--

LOCK TABLES `party_elections` WRITE;
/*!40000 ALTER TABLE `party_elections` DISABLE KEYS */;
INSERT INTO `party_elections` VALUES (1,1,1,1),(2,2,1,2),(3,1,2,5),(4,2,2,3),(5,1,2,4),(6,2,2,3);
/*!40000 ALTER TABLE `party_elections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `party_name_changes`
--

DROP TABLE IF EXISTS `party_name_changes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `party_name_changes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `party_id` int NOT NULL,
  `old_name` varchar(100) NOT NULL,
  `change_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `party_name_changes`
--

LOCK TABLES `party_name_changes` WRITE;
/*!40000 ALTER TABLE `party_name_changes` DISABLE KEYS */;
/*!40000 ALTER TABLE `party_name_changes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES (1,'AK'),(2,'AL'),(3,'AR'),(4,'AZ'),(5,'CA'),(6,'CO'),(7,'CT'),(8,'DC'),(9,'DE'),(10,'FL'),(11,'GA'),(12,'HI'),(13,'IA'),(14,'ID'),(15,'IL'),(16,'IN'),(17,'KS'),(18,'KY'),(19,'LA'),(20,'MA'),(21,'MD'),(22,'ME'),(23,'MI'),(24,'MN'),(25,'MO'),(26,'MS'),(27,'MT'),(28,'NC'),(29,'ND'),(30,'NE'),(31,'NH'),(32,'NJ'),(33,'NM'),(34,'NV'),(35,'NY'),(36,'OH'),(37,'OK'),(38,'OR'),(39,'PA'),(40,'RI'),(41,'SC'),(42,'SD'),(43,'TN'),(44,'TX'),(45,'UT'),(46,'VA'),(47,'VT'),(48,'WA'),(49,'WI'),(50,'WV'),(51,'WY');
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `representatives`
--

DROP TABLE IF EXISTS `representatives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `representatives` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` tinytext,
  `last_name` tinytext,
  `image_url` varchar(250) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `representatives`
--

LOCK TABLES `representatives` WRITE;
/*!40000 ALTER TABLE `representatives` DISABLE KEYS */;
INSERT INTO `representatives` VALUES (1,'Donald','Trump','https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/237px-Donald_Trump_official_portrait.jpg',NULL),(2,'Hillary','Clinton','https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Hillary_Clinton_Arizona_2016_.jpg/228px-Hillary_Clinton_Arizona_2016_.jpg',NULL),(3,'Barack','Obama','https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Obama_portrait_crop.jpg/149px-Obama_portrait_crop.jpg',NULL),(4,'John','McCain','https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/John_McCain_2009_Official.jpg/150px-John_McCain_2009_Official.jpg',NULL),(5,'Mitt','Romney','https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Mitt_Romney_by_Gage_Skidmore_6_cropped.jpg/149px-Mitt_Romney_by_Gage_Skidmore_6_cropped.jpg',NULL);
/*!40000 ALTER TABLE `representatives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'onnwen.cassitto@icloud.com','Onnwen Cassitto','onnwencassitto');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voter_turnout`
--

DROP TABLE IF EXISTS `voter_turnout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voter_turnout` (
  `id` int NOT NULL AUTO_INCREMENT,
  `election_id` int NOT NULL,
  `region_id` int NOT NULL,
  `total_turnout` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voter_turnout`
--

LOCK TABLES `voter_turnout` WRITE;
/*!40000 ALTER TABLE `voter_turnout` DISABLE KEYS */;
/*!40000 ALTER TABLE `voter_turnout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votes`
--

DROP TABLE IF EXISTS `votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `election_id` int NOT NULL,
  `party_id` int NOT NULL,
  `region_id` int NOT NULL,
  `total_votes` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1388 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votes`
--

LOCK TABLES `votes` WRITE;
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
INSERT INTO `votes` VALUES (929,1,2,1,116454),(930,1,1,1,163387),(931,1,3,1,38767),(932,1,2,2,729547),(933,1,1,2,1318255),(934,1,3,2,75570),(935,1,2,3,380494),(936,1,1,3,684872),(937,1,3,3,65310),(938,1,2,4,1161167),(939,1,1,4,1252401),(940,1,3,4,159597),(941,1,2,5,8753792),(942,1,1,5,4483814),(943,1,3,5,943998),(944,1,2,6,1338870),(945,1,1,6,1202484),(946,1,3,6,238893),(947,1,2,7,897572),(948,1,1,7,673215),(949,1,3,7,74133),(950,1,2,8,282830),(951,1,1,8,12723),(952,1,3,8,15715),(953,1,2,9,235603),(954,1,1,9,185127),(955,1,3,9,23084),(956,1,2,10,4504975),(957,1,1,10,4617886),(958,1,3,10,297178),(959,1,2,11,1877963),(960,1,1,11,2089104),(961,1,3,11,147665),(962,1,2,12,266891),(963,1,1,12,128847),(964,1,3,12,33199),(965,1,2,13,653669),(966,1,1,13,800983),(967,1,3,13,111379),(968,1,2,14,189765),(969,1,1,14,409055),(970,1,3,14,91435),(971,1,2,15,3090729),(972,1,1,15,2146015),(973,1,3,15,299680),(974,1,2,16,1033126),(975,1,1,16,1557286),(976,1,3,16,144546),(977,1,2,17,427005),(978,1,1,17,671018),(979,1,3,17,86379),(980,1,2,18,628854),(981,1,1,18,1202971),(982,1,3,18,92324),(983,1,2,19,780154),(984,1,1,19,1178638),(985,1,3,19,70240),(986,1,2,20,1995196),(987,1,1,20,1090893),(988,1,3,20,238957),(989,1,2,21,1677928),(990,1,1,21,943169),(991,1,3,21,160349),(992,1,2,22,357735),(993,1,1,22,335593),(994,1,3,22,54599),(995,1,2,23,2268839),(996,1,1,23,2279543),(997,1,3,23,250902),(998,1,2,24,1367716),(999,1,1,24,1322951),(1000,1,3,24,254146),(1001,1,2,25,1071068),(1002,1,1,25,1594511),(1003,1,3,25,143026),(1004,1,2,26,485131),(1005,1,1,26,700714),(1006,1,3,26,23512),(1007,1,2,27,177709),(1008,1,1,27,279240),(1009,1,3,27,40198),(1010,1,2,28,2189316),(1011,1,1,28,2362631),(1012,1,3,28,189617),(1013,1,2,29,93758),(1014,1,1,29,216794),(1015,1,3,29,33808),(1016,1,2,30,284494),(1017,1,1,30,495961),(1018,1,3,30,63772),(1019,1,2,31,348526),(1020,1,1,31,345790),(1021,1,3,31,49980),(1022,1,2,32,2148278),(1023,1,1,32,1601933),(1024,1,3,32,123835),(1025,1,2,33,385234),(1026,1,1,33,319667),(1027,1,3,33,93418),(1028,1,2,34,539260),(1029,1,1,34,512058),(1030,1,3,34,74067),(1031,1,2,35,4556118),(1032,1,1,35,2819533),(1033,1,3,35,345791),(1034,1,2,36,2394164),(1035,1,1,36,2841005),(1036,1,3,36,261318),(1037,1,2,37,420375),(1038,1,1,37,949136),(1039,1,3,37,83481),(1040,1,2,38,1002106),(1041,1,1,38,782403),(1042,1,3,38,216827),(1043,1,2,39,2926441),(1044,1,1,39,2970733),(1045,1,3,39,268304),(1046,1,2,40,252525),(1047,1,1,40,180543),(1048,1,3,40,31076),(1049,1,2,41,855373),(1050,1,1,41,1155389),(1051,1,3,41,92265),(1052,1,2,42,117458),(1053,1,1,42,227721),(1054,1,3,42,24914),(1055,1,2,43,870695),(1056,1,1,43,1522925),(1057,1,3,43,114407),(1058,1,2,44,3877868),(1059,1,1,44,4685047),(1060,1,3,44,406311),(1061,1,2,45,310676),(1062,1,1,45,515231),(1063,1,3,45,305523),(1064,1,2,46,1981473),(1065,1,1,46,1769443),(1066,1,3,46,233715),(1067,1,2,47,178573),(1068,1,1,47,95369),(1069,1,3,47,41125),(1070,1,2,48,1742718),(1071,1,1,48,1221747),(1072,1,3,48,352554),(1073,1,2,49,1382536),(1074,1,1,49,1405284),(1075,1,3,49,188330),(1076,1,2,50,188794),(1077,1,1,50,489371),(1078,1,3,50,36258),(1079,1,2,51,55973),(1080,1,1,51,174419),(1081,1,3,51,25457),(1082,2,2,1,122640),(1083,2,1,1,164676),(1084,2,3,1,13179),(1085,2,2,2,795696),(1086,2,1,2,1255925),(1087,2,3,2,22717),(1088,2,2,3,394409),(1089,2,1,3,647744),(1090,2,3,3,27315),(1091,2,2,4,1025232),(1092,2,1,4,1233654),(1093,2,3,4,40368),(1094,2,2,5,7854285),(1095,2,1,5,4839958),(1096,2,3,5,344304),(1097,2,2,6,1323102),(1098,2,1,6,1185243),(1099,2,3,6,61177),(1100,2,2,7,905083),(1101,2,1,7,634892),(1102,2,3,7,18985),(1103,2,2,8,267070),(1104,2,1,8,21381),(1105,2,3,8,5313),(1106,2,2,9,242584),(1107,2,1,9,165484),(1108,2,3,9,5853),(1109,2,2,10,4237756),(1110,2,1,10,4163447),(1111,2,3,10,72976),(1112,2,2,11,1773827),(1113,2,1,11,2078688),(1114,2,3,11,47535),(1115,2,2,12,306658),(1116,2,1,12,121015),(1117,2,3,12,7024),(1118,2,2,13,822544),(1119,2,1,13,730617),(1120,2,3,13,29019),(1121,2,2,14,212787),(1122,2,1,14,420911),(1123,2,3,14,18576),(1124,2,2,15,3019512),(1125,2,1,15,2135216),(1126,2,3,15,87286),(1127,2,2,16,1152887),(1128,2,1,16,1420543),(1129,2,3,16,51104),(1130,2,2,17,440726),(1131,2,1,17,692634),(1132,2,3,17,26611),(1133,2,2,18,679370),(1134,2,1,18,1087190),(1135,2,3,18,30652),(1136,2,2,19,809141),(1137,2,1,19,1152262),(1138,2,3,19,32662),(1139,2,2,20,1921290),(1140,2,1,20,1188314),(1141,2,3,20,58163),(1142,2,2,21,1677844),(1143,2,1,21,971869),(1144,2,3,21,57614),(1145,2,2,22,401306),(1146,2,1,22,292276),(1147,2,3,22,19598),(1148,2,2,23,2564569),(1149,2,1,23,2115256),(1150,2,3,23,51136),(1151,2,2,24,1546167),(1152,2,1,24,1320225),(1153,2,3,24,70169),(1154,2,2,25,1223796),(1155,2,1,25,1482440),(1156,2,3,25,51087),(1157,2,2,26,562949),(1158,2,1,26,710746),(1159,2,3,26,11889),(1160,2,2,27,201839),(1161,2,1,27,267928),(1162,2,3,27,14281),(1163,2,2,28,2178391),(1164,2,1,28,2270395),(1165,2,3,28,56586),(1166,2,2,29,124827),(1167,2,1,29,188163),(1168,2,3,29,9637),(1169,2,2,30,302081),(1170,2,1,30,475064),(1171,2,3,30,17234),(1172,2,2,31,369561),(1173,2,1,31,329918),(1174,2,3,31,11493),(1175,2,2,32,2125101),(1176,2,1,32,1477568),(1177,2,3,32,37623),(1178,2,2,33,415335),(1179,2,1,33,335788),(1180,2,3,33,32635),(1181,2,2,34,531373),(1182,2,1,34,463567),(1183,2,3,34,19978),(1184,2,2,35,4485741),(1185,2,1,35,2490431),(1186,2,3,35,104987),(1187,2,2,36,2827709),(1188,2,1,36,2661437),(1189,2,3,36,91701),(1190,2,2,37,443547),(1191,2,1,37,891325),(1192,2,3,37,0),(1193,2,2,38,970488),(1194,2,1,38,754175),(1195,2,3,38,64607),(1196,2,2,39,2990274),(1197,2,1,39,2680434),(1198,2,3,39,82962),(1199,2,2,40,279677),(1200,2,1,40,157204),(1201,2,3,40,9168),(1202,2,2,41,865941),(1203,2,1,41,1071645),(1204,2,3,41,26532),(1205,2,2,42,145039),(1206,2,1,42,210610),(1207,2,3,42,8166),(1208,2,2,43,960709),(1209,2,1,43,1462330),(1210,2,3,43,35538),(1211,2,2,44,3308124),(1212,2,1,44,4569843),(1213,2,3,44,115884),(1214,2,2,45,251813),(1215,2,1,45,740600),(1216,2,3,45,25027),(1217,2,2,46,1971820),(1218,2,1,46,1822522),(1219,2,3,46,60147),(1220,2,2,47,199239),(1221,2,1,47,92698),(1222,2,3,47,7353),(1223,2,2,48,1755396),(1224,2,1,48,1290670),(1225,2,3,48,79450),(1226,2,2,49,1620985),(1227,2,1,49,1407966),(1228,2,3,49,39483),(1229,2,2,50,238269),(1230,2,1,50,417655),(1231,2,3,50,14514),(1232,2,2,51,69286),(1233,2,1,51,170962),(1234,2,3,51,8813),(1235,3,2,1,123594),(1236,3,1,1,193841),(1237,3,3,1,8762),(1238,3,2,2,813479),(1239,3,1,2,1266546),(1240,3,3,2,19794),(1241,3,2,3,422310),(1242,3,1,3,638017),(1243,3,3,3,26290),(1244,3,2,4,1034707),(1245,3,1,4,1230111),(1246,3,3,4,28657),(1247,3,2,5,8274473),(1248,3,1,5,5011781),(1249,3,3,5,275646),(1250,3,2,6,1288633),(1251,3,1,6,1073629),(1252,3,3,6,39200),(1253,3,2,7,997772),(1254,3,1,7,629428),(1255,3,3,7,19597),(1256,3,2,8,245800),(1257,3,1,8,17367),(1258,3,3,8,2686),(1259,3,2,9,255459),(1260,3,1,9,152374),(1261,3,3,9,4579),(1262,3,2,10,4282074),(1263,3,1,10,4045624),(1264,3,3,10,63046),(1265,3,2,11,1844123),(1266,3,1,11,2048759),(1267,3,3,11,31604),(1268,3,2,12,325871),(1269,3,1,12,120566),(1270,3,3,12,7131),(1271,3,2,13,828940),(1272,3,1,13,682379),(1273,3,3,13,25804),(1274,3,2,14,236440),(1275,3,1,14,403012),(1276,3,3,14,15670),(1277,3,2,15,3419348),(1278,3,1,15,2031179),(1279,3,3,15,71844),(1280,3,2,16,1374039),(1281,3,1,16,1345648),(1282,3,3,16,31367),(1283,3,2,17,514765),(1284,3,1,17,699655),(1285,3,3,17,21452),(1286,3,2,18,751985),(1287,3,1,18,1048462),(1288,3,3,18,26173),(1289,3,2,19,782989),(1290,3,1,19,1148275),(1291,3,3,19,29497),(1292,3,2,20,1904097),(1293,3,1,20,1108854),(1294,3,3,20,68034),(1295,3,2,21,1629467),(1296,3,1,21,959862),(1297,3,3,21,42267),(1298,3,2,22,421923),(1299,3,1,22,295273),(1300,3,3,22,13967),(1301,3,2,23,2872579),(1302,3,1,23,2048639),(1303,3,3,23,80548),(1304,3,2,24,1573354),(1305,3,1,24,1275409),(1306,3,3,24,61606),(1307,3,2,25,1441911),(1308,3,1,25,1445814),(1309,3,3,25,37480),(1310,3,2,26,554662),(1311,3,1,26,724597),(1312,3,3,26,10606),(1313,3,2,27,231667),(1314,3,1,27,242763),(1315,3,3,27,15872),(1316,3,2,28,2142651),(1317,3,1,28,2128474),(1318,3,3,28,39664),(1319,3,2,29,141278),(1320,3,1,29,168601),(1321,3,3,29,6742),(1322,3,2,30,333319),(1323,3,1,30,452979),(1324,3,3,30,14983),(1325,3,2,31,384826),(1326,3,1,31,316534),(1327,3,3,31,9610),(1328,3,2,32,2215422),(1329,3,1,32,1613207),(1330,3,3,32,39608),(1331,3,2,33,472422),(1332,3,1,33,346832),(1333,3,3,33,10904),(1334,3,2,34,533736),(1335,3,1,34,412827),(1336,3,3,34,21285),(1337,3,2,35,4804945),(1338,3,1,35,2752771),(1339,3,3,35,83215),(1340,3,2,36,2940044),(1341,3,1,36,2677820),(1342,3,3,36,90486),(1343,3,2,37,502496),(1344,3,1,37,960165),(1345,3,3,37,0),(1346,3,2,38,1037291),(1347,3,1,38,738475),(1348,3,3,38,52098),(1349,3,2,39,3276363),(1350,3,1,39,2655885),(1351,3,3,39,81024),(1352,3,2,40,296571),(1353,3,1,40,165391),(1354,3,3,40,9804),(1355,3,2,41,862449),(1356,3,1,41,1034896),(1357,3,3,41,23624),(1358,3,2,42,170924),(1359,3,1,42,203054),(1360,3,3,42,7997),(1361,3,2,43,1087437),(1362,3,1,43,1479178),(1363,3,3,43,33134),(1364,3,2,44,3528633),(1365,3,1,44,4479328),(1366,3,3,44,69834),(1367,3,2,45,327670),(1368,3,1,45,596030),(1369,3,3,45,28670),(1370,3,2,46,1959532),(1371,3,1,46,1725005),(1372,3,3,46,38723),(1373,3,2,47,219262),(1374,3,1,47,98974),(1375,3,3,47,6810),(1376,3,2,48,1750848),(1377,3,1,48,1229216),(1378,3,3,48,56814),(1379,3,2,49,1677211),(1380,3,1,49,1262393),(1381,3,3,49,43813),(1382,3,2,50,303857),(1383,3,1,50,397466),(1384,3,3,50,12128),(1385,3,2,51,82868),(1386,3,1,51,164958),(1387,3,3,51,6832);
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-30  8:34:58
