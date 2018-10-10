CREATE TABLE  IF NOT EXISTS  `user` (
  `id` varchar(40) PRIMARY KEY,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `nick` varchar(100) DEFAULT NULL,
  `create_time` BIGINT(20) DEFAULT 0,
  `modified_time` BIGINT(20) DEFAULT 0,
  `level` int(6) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;