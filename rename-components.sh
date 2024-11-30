#!/bin/bash

# Navigate to the frontend directory
cd frontend

# Find all .js files and rename them to .jsx
find . -type f -name '*.js' -print0 | while IFS= read -r -d '' file; do
    # Get the directory path and filename
    dir=$(dirname "$file")
    filename=$(basename "$file")
    
    # Create the new filename with .jsx extension
    new_filename="${filename%.js}.jsx"
    
    # Perform the rename
    mv "$file" "$dir/$new_filename"
    echo "Renamed: $file -> $dir/$new_filename"
done

echo "All .js files have been renamed to .jsx!"