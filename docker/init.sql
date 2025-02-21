-- Users 테이블 생성 및 샘플 데이터 삽입
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    profile_image VARCHAR(255),
    bio TEXT,
    role VARCHAR(20) DEFAULT 'user',
    reputation INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active',
    default_community_id INTEGER, -- Communities 테이블 참조 (나중에 FOREIGN KEY 제약조건 추가 가능)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password_hash, role, reputation, status, default_community_id)
VALUES ('Alice', 'alice@example.com', 'hashedpassword', 'user', 1000, 'active', 1);

-- Communities 테이블 생성 및 샘플 데이터 삽입
CREATE TABLE IF NOT EXISTS communities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_by INTEGER REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO communities (name, description, created_by)
VALUES ('Humour', 'Funny and light-hearted content', 1);

-- Posts 테이블 생성 및 샘플 데이터 삽입
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    posted_by INTEGER REFERENCES users(id),
    community_id INTEGER REFERENCES communities(id),
    media_url VARCHAR(255),
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    popularity_score INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO posts (title, content, posted_by, community_id, upvotes, downvotes, views)
VALUES ('Welcome to K‑Reddit', 'This is our first post!', 1, 1, 300, 50, 1234);

-- Comments 테이블 생성 및 샘플 데이터 삽입
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id),
    user_id INTEGER REFERENCES users(id),
    parent_comment_id INTEGER REFERENCES comments(id),
    content TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO comments (post_id, user_id, content, upvotes, downvotes)
VALUES (1, 1, 'Great post!', 10, 2);

-- Votes 테이블 생성
CREATE TABLE IF NOT EXISTS votes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    post_id INTEGER REFERENCES posts(id),
    comment_id INTEGER REFERENCES comments(id),
    vote_type VARCHAR(10) CHECK (vote_type IN ('up', 'down')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (
      (post_id IS NOT NULL AND comment_id IS NULL) OR
      (post_id IS NULL AND comment_id IS NOT NULL)
    )
);

-- Drafts 테이블 생성 (옵션)
CREATE TABLE IF NOT EXISTS drafts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255),
    content TEXT,
    media_url VARCHAR(255),
    link_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ActivityLogs 테이블 생성
CREATE TABLE IF NOT EXISTS activity_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action_type VARCHAR(50) NOT NULL,
    target_id VARCHAR(50),
    target_type VARCHAR(20),
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO activity_logs (user_id, action_type, target_id, target_type, details)
VALUES (1, 'create_post', '1', 'post', '{"ip": "192.168.1.1"}');

-- Reports 테이블 생성
CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    reporter_id INTEGER REFERENCES users(id),
    target_id INTEGER,
    target_type VARCHAR(20) CHECK (target_type IN ('post', 'comment')),
    reason TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO reports (reporter_id, target_id, target_type, reason)
VALUES (1, 1, 'post', 'Inappropriate content');

-- Notifications 테이블 생성
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO notifications (user_id, message, is_read)
VALUES (1, 'Your post has been approved.', false);
