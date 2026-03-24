<?php
$data = file("scores.txt", FILE_IGNORE_NEW_LINES);

rsort($data);

foreach (array_slice($data, 0, 5) as $row) {
    echo "<p>$row</p>";
}
?>