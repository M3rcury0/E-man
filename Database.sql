
--
-- Table structure for table `employee`
--

CREATE TABLE employee (
  id int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  age int NOT NULL,
  manager_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY manager_idx (manager_id),
  CONSTRAINT manager FOREIGN KEY (manager_id) REFERENCES manager (id)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;



LOCK TABLES employee WRITE;
/*!40000 ALTER TABLE employee DISABLE KEYS */;
INSERT INTO employee VALUES (1,'Rakesh Chaudhary ',56,2),(2,'Suman Mishra',21,1),(3,'Anil Joshi',29,3),(4,'nandita Gupta',32,5),(5,'Ashwin Tewari',40,2),(6,'Ritu Menon',25,1),(7,'Prakash Desai',50,4),(8,'Manoj Verma',22,3),(9,'Abhishek Ghosh',39,1),(10,'Meera Patil',41,4);
/*!40000 ALTER TABLE employee ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manager`
--

DROP TABLE IF EXISTS manager;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE manager (
  id int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  department varchar(225) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


LOCK TABLES manager WRITE;
/*!40000 ALTER TABLE manager DISABLE KEYS */;
INSERT INTO manager VALUES (1,'Manohar Sing','HR'),(2,'Priya Patel','Accounting'),(3,'Sanjay Bhatt','Sales'),(4,'Jyoti Nair','IT'),(5,'Sunita Nair','Marketing');
/*!40000 ALTER TABLE manager ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

CREATE TABLE users (
  username varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (username),
  UNIQUE KEY username_UNIQUE (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES users WRITE;
/*!40000 ALTER TABLE users DISABLE KEYS */;
INSERT INTO users VALUES ('bhoothumein98','asdasd4as2069'),('jadoo24','asdasdw8715'),('meera99','asdasd541'),('nameisghosh','ghjfhd4454s'),('suman@24','eteawsrfdasdfc65'),('therajesh54','asdcrgghreut96'),('yashking_55','cvbxcx2');
/*!40000 ALTER TABLE users ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


