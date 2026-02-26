$source = Get-Item "C:\Users\rodri\Documents\2DAW\DIW2\proyectoFinalDise*" | Select-Object -First 1
$dest = "C:\Users\rodri\Documents\2DAW\DIW2\proyectoFinalDisenio"

if (-not (Test-Path $dest)) {
    New-Item -ItemType Directory -Force -Path $dest
}

Get-ChildItem -Path $source.FullName -Exclude "node_modules", ".git" | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $dest -Recurse -Force
}

Write-Output "Copied successfully"
