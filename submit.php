<?php
$name = $_POST['name'];
$score = $_POST['score'];

file_put_contents("scores.txt", "$name - $score\n", FILE_APPEND);
?>