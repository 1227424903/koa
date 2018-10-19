CREATE TABLE  IF NOT EXISTS  `video` (
  `id` varchar(40) PRIMARY KEY,
  `user_id` varchar(40) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `nick` varchar(100) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `click` int(6) DEFAULT 0,
  `comment` int(6) DEFAULT 0,
  `create_time` BIGINT(20) DEFAULT 0,
  `modified_time` BIGINT(20) DEFAULT 0,
  `active` int(6) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;