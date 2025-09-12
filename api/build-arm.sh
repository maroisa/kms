export GOOS=linux
export GOARCH=arm64
go build -ldflags "-w -s" .
