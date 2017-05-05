/**
 * cop server management(信息管理)
 * @authors
 */

// ajax sync
$.ajaxSettings.async = false;
var res;

var Zoneserver = React.createClass({
    getInitialState: function() {
        return {
            zoneloading: true,
            zoneerror: null,
            zonedata: null,
        };
    },

    componentDidMount() {
        this.props.zonepage.then(value => this.setState({zoneloading: false, zonedata: value}), error => this.setState({zoneloading: false, zoneerror: error}));
    },
    render: function() {
            var repos = this.state.zonedata;
            console.log(repos);
            var o = this;
            var zonepage = repos.map(function(repo) {
                return (
                    <tr key={repo.id}>
                        <td>{repo.ip}</td>
                        <td>{repo.domain}</td>
                        <td><input type="button" className="btn btn-danger"  name="zone"  id={repo.id}  onClick={o.showdel.bind(null,repo.id)} value="删除"/>
                            <input type="button" className="btn btn btn-warning" name="zone"  id={repo.id}  onClick={o.showchanzone.bind(null,repo.id)} value="修改"/>
                    </td>
                    </tr>
                );
            });
            return (
                <div className="container">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>IP</td>
                                <td>DOMAIN</td>
                                <td>ssh</td>
                            </tr>
                        </thead>
                        <tbody>
                            {zonepage}
                        </tbody>
                    </table>
                    {/* 修改区服信息 */}
                    <div className="modal fade" id="modify_zone" tabIndex="-1" role="dialog" aria-labelledby="修改区服" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">
                                        <span aria-hidden="true">&times;</span>
                                        <span className="sr-only">Close</span>
                                    </button>
                                    <h4 className="modal-title">修改区服</h4>
                                </div>
                                <div className="modal-body">
                                    <form className="form-group">
                                        服务器ID<input className="form-control" type="text" id="zone_id" disabled="true"/>
                                        服务器名称<input className="form-control" type="text" id="site_name"/>
                                        平台名称<select className="form-control"  id="agent">{selectagent}</select>
                                        GAME_SITE<input className="form-control" type="text" id="site" />
                                        服务器IP<input className="form-control" type="text" id="host" />
                                        热更新路径<input className="form-control" type="text" id="hotbin"/>
                                        <div className="col-md-11 col-sm-11 col-xs-11" id="choice_per">
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                                    <button type="button" className="btn btn-primary" onClick={this.ChanInfo}>保存</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 复制区服信息 */}
                    <div className="modal fade" id="ccopy_zone" tabIndex="-1" role="dialog" aria-labelledby="复制新增区服信息" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">
                                        <span aria-hidden="true">&times;</span>
                                        <span className="sr-only">Close</span>
                                    </button>
                                    <h4 className="modal-title">复制区服</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        服务器ID<input className="form-control" type="text" id="czone_id" />
                                        域名<select className="form-control" name="cagent" id="">{selectagent}</select>
                                        SSH密码<input className="form-control" type="text" id="csite_name"/>
                                        MySQL密码<input className="form-control" type="text" id="csite" />
                                        备注<input className="form-control" type="text" id="chost" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                                    <button type="button" className="btn btn-primary" onClick={this.CopyInfo}>保存</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 删除区服 */}
                    <div className="modal fade" id="delu" tabIndex="-1" role="dialog" aria-labelledby="删除用户" aria-hidden="true">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">
                                        <span aria-hidden="true">&times;</span>
                                        <span className="sr-only">Close</span>
                                    </button>
                                    <h4 className="modal-title">删除区服</h4>
                                </div>
                                <div className="modal-body">
                                    <div id="delMsg"></div>
                                    <div id="delzone"></div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                                    <button type="button" className="btn btn-primary" onClick={this.delzone}>确定</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 成功OR失败 */}
                    <div className="modal fade" id="fos" tabIndex="-1" role="dialog" aria-labelledby="信息" aria-hidden="true">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">
                                        <span aria-hidden="true">&times;</span>
                                        <span className="sr-only">Close</span>
                                    </button>
                                    <h4 className="modal-title">信息</h4>
                                </div>
                                <div className="modal-body">
                                    <div id="opMsg"></div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
     
    }
});

function getData(data) {
    var getData = './getdata/?case=' + data;
    return getData;
}

ReactDOM.render(
    <Zoneserver zonepage={$.getJSON(getData('1'))}/>, document.getElementById('show'));
