<?php 

class DbConnection {
    private $server = "localhost";
    private $dbname = "react_crud";
    private $username = "root";
    private $password = '';

    public function connect() {
        try {
            $conn = new PDO("mysql:host={$this->server};dbname={$this->dbname}", $this->username, $this->password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            die(json_encode(['status' => 0, 'message' => 'Database connection error: ' . $e->getMessage()]));
        }
    }
}
?>
