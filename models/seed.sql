USE movie_review_db;

-- Insert Users --
INSERT INTO users (email, password, createdAt, updatedAt)
VALUES
  ("aaa@gmail.com", "aaa", NOW(), NOW()),
  ("bbb@gmail.com", "bbb", NOW(), NOW()),
  ("ccc@gmail.com", "ccc", NOW(), NOW()),
  ("ddd@gmail.com", "ddd", NOW(), NOW()),
  ("eee@gmail.com", "eee", NOW(), NOW());
INSERT INTO movies (title, rating, year, img, createdAt, updatedAt)
VALUES
  ("Frozen", "G", 2007, "", NOW(), NOW()),
  ("The Matrix", "R", 1999, "", NOW(), NOW()),
  (
    "Gone With the Wind",
    "PG",
    1946,
    "",
    NOW(),
    NOW()
  ),
  ("Goodfellas", "R", 1997, "", NOW(), NOW());
  -- Insert Reviews --
INSERT INTO reviews (
    review,
    score,
    UserId,
    MovieId,
    createdAt,
    updatedAt
  )
VALUES
  (
    "Sisters do cool things.",
    7.5,
    1,
    1,
    NOW(),
    NOW()
  ),
  (
    "Typical Disney soundtrack.Catchy songs and colorful characters.Refreshing that the movie is about a strong woman who does not need a prince to rescue her.",
    8.0,
    1,
    2,
    NOW(),
    NOW()
  ),
  (
    "I almost slept! Terrible movie! Not worth spending your time and money!",
    2,
    1,
    3,
    NOW(),
    NOW()
  ),
  ("With a visionary direction and script by the Wachowskis, a beautiful soundtrack by Don Davis, perfect visual effects, striking action scenes, cutting - edge cinematography by Bill Pope", 9, 4, 2, NOW(), NOW()),
  (
    "Keanu Reeves is brilliant along with all the cast! Amazing movie!",
    9.0,
    3,
    2,
    NOW(),
    NOW()
  )